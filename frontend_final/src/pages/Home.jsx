import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Sidebar from "../components/sidebar/Sidebar";
import MapView from "../components/map/MapView";

import { getToken } from "../services/auth";
import { requestRide, getRide, cancelRide } from "../services/ride";
import { connectRideTracking } from "../services/tracking";

const ACTIVE_STATUSES = ["REQUESTED", "ACCEPTED"];

export default function Home() {

    const navigate = useNavigate();

    const [pickup, setPickup] = useState(null);
    const [destination, setDestination] = useState(null);

    const [route, setRoute] = useState(null);

    const [eta, setEta] = useState(null);
    const [driver, setDriver] = useState(null);
    const [fraud, setFraud] = useState(null);

    const [ride, setRide] = useState(null);
    const [rideError, setRideError] = useState("");
    const [requesting, setRequesting] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    const [driverLocation, setDriverLocation] = useState(null);

    const wsRef = useRef(null);

    async function handleRequestRide() {

        if (!pickup || !destination) return;

        if (!getToken()) {

            navigate("/login");

            return;

        }

        setRequesting(true);
        setRideError("");
        setRide(null);
        setDriverLocation(null);

        try {

            const data = await requestRide({
                pickup_lat: pickup.lat,
                pickup_lon: pickup.lng,
                destination_lat: destination.lat,
                destination_lon: destination.lng,
            });

            setRide(data);

        } catch (err) {

            setRideError(
                err.response?.data?.detail ||
                "Could not request a ride. Please try again."
            );

        } finally {

            setRequesting(false);

        }

    }

    async function handleCancelRide() {

        if (!ride) return;

        setCancelling(true);

        try {

            const data = await cancelRide(ride.id);

            setRide(data);

        } catch (err) {

            setRideError(
                err.response?.data?.detail ||
                "Could not cancel the ride."
            );

        } finally {

            setCancelling(false);

        }

    }

    // Poll ride status while it's active, so we notice ACCEPTED/COMPLETED transitions
    useEffect(() => {

        if (!ride || !ACTIVE_STATUSES.includes(ride.status)) return;

        let cancelled = false;

        const interval = setInterval(async () => {

            try {

                const data = await getRide(ride.id);

                if (!cancelled) setRide(data);

            } catch {
                // ignore transient poll failures
            }

        }, 4000);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };

    }, [ride?.id, ride?.status]);

    // Live-track the assigned driver once a ride is on its way
    useEffect(() => {

        if (!ride || ride.status !== "ACCEPTED" || !ride.driver_id) {

            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }

            return;

        }

        const socket = connectRideTracking(ride.id);

        wsRef.current = socket;

        socket.onmessage = (event) => {

            const data = JSON.parse(event.data);

            if (data.type === "location") {
                setDriverLocation({ lat: data.lat, lng: data.lng });
            }

        };

        return () => {
            socket.close();
            if (wsRef.current === socket) wsRef.current = null;
        };

    }, [ride?.id, ride?.status, ride?.driver_id]);

    return (

        <Grid
            container
            spacing={2}
            sx={{ p: 2 }}
        >

            <Grid size={{ xs: 12, md: 4, lg: 3 }}>

                <Sidebar

                    pickup={pickup}
                    destination={destination}
                    route={route}
                    eta={eta}
                    driver={driver}
                    fraud={fraud}

                    setPickup={setPickup}
                    setDestination={setDestination}

                    onRequestRide={handleRequestRide}
                    requesting={requesting}
                    rideError={rideError}
                    ride={ride}

                    onCancelRide={handleCancelRide}
                    cancelling={cancelling}

                />

            </Grid>

            <Grid size={{ xs: 12, md: 8, lg: 9 }}>

                <MapView

                    pickup={pickup}
                    destination={destination}

                    route={route}
                    setRoute={setRoute}

                    setPickup={setPickup}
                    setDestination={setDestination}

                    setEta={setEta}
                    setDriver={setDriver}
                    setFraud={setFraud}

                    driverLocation={driverLocation}

                />

            </Grid>

        </Grid>

    );

}
