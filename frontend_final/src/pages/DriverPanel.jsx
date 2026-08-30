import { useEffect, useRef, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    TextField,
    Alert,
    List,
    ListItem,
    ListItemText,
    Chip,
    CircularProgress,
    Stack,
    Divider,
} from "@mui/material";

import {
    getMyDriverProfile,
    registerDriver,
    setDriverOnlineStatus,
} from "../services/drivers";

import {
    getPendingRides,
    acceptRide,
    completeRide,
    getDriverActiveRide,
} from "../services/ride";

import { connectRideTracking, sendLocation } from "../services/tracking";

export default function DriverPanel() {

    const [status, setStatus] = useState("loading"); // loading | onboarding | ready
    const [driver, setDriver] = useState(null);
    const [error, setError] = useState("");

    const [licenseNumber, setLicenseNumber] = useState("");
    const [nid, setNid] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [pendingRides, setPendingRides] = useState([]);
    const [activeRide, setActiveRide] = useState(null);
    const [tracking, setTracking] = useState(false);
    const [actionError, setActionError] = useState("");

    const wsRef = useRef(null);
    const watchIdRef = useRef(null);
    const simIntervalRef = useRef(null);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await getMyDriverProfile();

                setDriver(data);
                setStatus("ready");

            } catch (err) {

                if (err.response?.status === 404) {
                    setStatus("onboarding");
                } else {
                    setError("Could not load your driver profile.");
                    setStatus("ready");
                }

            }

        }

        loadProfile();

    }, []);

    useEffect(() => {

        if (status !== "ready") return;

        getDriverActiveRide()
            .then((ride) => setActiveRide(ride))
            .catch(() => {});

    }, [status]);

    const canReceiveRides = status === "ready" && driver?.is_online && !activeRide;

    // Poll pending ride requests while online with no active ride
    useEffect(() => {

        if (!canReceiveRides) {
            return;
        }

        let cancelled = false;

        async function poll() {

            try {

                const data = await getPendingRides();

                if (!cancelled) setPendingRides(data);

            } catch {
                // ignore transient poll failures
            }

        }

        poll();

        const interval = setInterval(poll, 4000);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };

    }, [canReceiveRides]);

    const visiblePendingRides = canReceiveRides ? pendingRides : [];

    function stopTracking() {

        if (watchIdRef.current != null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        if (simIntervalRef.current) {
            clearInterval(simIntervalRef.current);
            simIntervalRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setTracking(false);

    }

    function startSimulatedMovement(socket, ride) {

        if (simIntervalRef.current) return;

        let step = 0;
        const steps = 30;

        simIntervalRef.current = setInterval(() => {

            step += 1;

            const t = Math.min(step / steps, 1);

            const lat = ride.pickup_lat + (ride.destination_lat - ride.pickup_lat) * t;
            const lng = ride.pickup_lon + (ride.destination_lon - ride.pickup_lon) * t;

            sendLocation(socket, lat, lng);

            if (t >= 1) {
                clearInterval(simIntervalRef.current);
                simIntervalRef.current = null;
            }

        }, 2000);

    }

    function startLocationUpdates(socket, ride) {

        if (navigator.geolocation) {

            watchIdRef.current = navigator.geolocation.watchPosition(
                (pos) => sendLocation(socket, pos.coords.latitude, pos.coords.longitude),
                () => startSimulatedMovement(socket, ride),
                { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 },
            );

        } else {

            startSimulatedMovement(socket, ride);

        }

    }

    // Broadcast live location for as long as there's an active ride
    useEffect(() => {

        if (!activeRide) return;

        const socket = connectRideTracking(activeRide.id);

        wsRef.current = socket;

        socket.onopen = () => {
            setTracking(true);
            startLocationUpdates(socket, activeRide);
        };

        socket.onerror = () => setTracking(false);

        return () => stopTracking();

    }, [activeRide?.id]);

    async function handleOnboard(e) {

        e.preventDefault();

        setSubmitting(true);
        setError("");

        try {

            const data = await registerDriver({
                license_number: licenseNumber,
                nid,
            });

            setDriver(data);
            setStatus("ready");

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Could not register as a driver."
            );

        } finally {

            setSubmitting(false);

        }

    }

    async function handleToggleOnline() {

        setActionError("");

        try {

            const data = await setDriverOnlineStatus(!driver.is_online);

            setDriver(data);

        } catch {

            setActionError("Could not update your status.");

        }

    }

    async function handleAccept(rideId) {

        setActionError("");

        try {

            const ride = await acceptRide(rideId);

            setActiveRide(ride);

        } catch (err) {

            setActionError(
                err.response?.data?.detail ||
                "Could not accept this ride — it may have just been taken."
            );

        }

    }

    async function handleComplete() {

        setActionError("");

        try {

            await completeRide(activeRide.id);

            stopTracking();

            setActiveRide(null);

        } catch (err) {

            setActionError(
                err.response?.data?.detail ||
                "Could not complete the ride."
            );

        }

    }

    if (status === "loading") {

        return <CircularProgress />;

    }

    if (status === "onboarding") {

        return (

            <Paper
                component="form"
                onSubmit={handleOnboard}
                sx={{ p: 4, maxWidth: 440 }}
            >

                <Typography variant="h5" gutterBottom>
                    Become a SmartRideAI driver
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Add your license details to start accepting ride requests.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    label="Driving License Number"
                    fullWidth
                    required
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="National ID"
                    fullWidth
                    required
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Register as Driver"}
                </Button>

            </Paper>

        );

    }

    return (

        <Stack spacing={3} sx={{ maxWidth: 640 }}>

            <Typography variant="h4">Driver Panel</Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {actionError && <Alert severity="warning">{actionError}</Alert>}

            <Paper sx={{ p: 3 }}>

                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>

                    <Box>

                        <Typography variant="subtitle1" fontWeight={600}>
                            {driver.is_online ? "You're online" : "You're offline"}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            ⭐ {driver.rating} · {driver.total_trips} trips completed
                        </Typography>

                    </Box>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={driver.is_online}
                                onChange={handleToggleOnline}
                                disabled={Boolean(activeRide)}
                            />
                        }
                        label={driver.is_online ? "Online" : "Offline"}
                    />

                </Stack>

            </Paper>

            {activeRide ? (

                <Paper sx={{ p: 3 }}>

                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>

                        <Typography variant="subtitle1" fontWeight={600}>
                            Active ride #{activeRide.id}
                        </Typography>

                        <Chip
                            size="small"
                            color={tracking ? "success" : "default"}
                            label={tracking ? "Broadcasting location" : "Connecting..."}
                        />

                    </Stack>

                    <Typography color="text.secondary" gutterBottom>
                        {activeRide.distance_km.toFixed(2)} km · ৳{activeRide.fare} · ETA ~{activeRide.estimated_duration} min
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleComplete}
                    >
                        Mark Ride Completed
                    </Button>

                </Paper>

            ) : (

                <Paper sx={{ p: 3 }}>

                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Pending ride requests
                    </Typography>

                    {!driver.is_online && (
                        <Typography color="text.secondary">
                            Go online to start receiving ride requests.
                        </Typography>
                    )}

                    {driver.is_online && visiblePendingRides.length === 0 && (
                        <Typography color="text.secondary">
                            No pending requests right now.
                        </Typography>
                    )}

                    {driver.is_online && visiblePendingRides.length > 0 && (

                        <List disablePadding>

                            {visiblePendingRides.map((ride, i) => (

                                <Box key={ride.id}>

                                    {i > 0 && <Divider component="li" />}

                                    <ListItem
                                        secondaryAction={
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleAccept(ride.id)}
                                            >
                                                Accept
                                            </Button>
                                        }
                                    >

                                        <ListItemText
                                            primary={`Ride #${ride.id} · ${ride.distance_km.toFixed(2)} km`}
                                            secondary={`Fare ৳${ride.fare} · ETA ~${ride.estimated_duration} min`}
                                        />

                                    </ListItem>

                                </Box>

                            ))}

                        </List>

                    )}

                </Paper>

            )}

        </Stack>

    );

}
