import {
    Paper,
    Typography,
    Divider,
    Button,
    Chip,
    Stack,
    Alert,
    IconButton,
    Box,
} from "@mui/material";

import LocationSearch from "../search/LocationSearch";

const STATUS_COLOR = {
    REQUESTED: "warning",
    ACCEPTED: "info",
    COMPLETED: "success",
    CANCELLED: "default",
};

export default function Sidebar({

    pickup,
    destination,
    route,
    eta,
    driver,
    fraud,

    setPickup,
    setDestination,

    onRequestRide,
    requesting,
    rideError,
    ride,

    onCancelRide,
    cancelling,

}) {

    const formatLocation = (location) => {

        if (!location) return "Not Selected";

        if (location.name) return location.name;

        return `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;

    };

    const rideIsActive = ride && ["REQUESTED", "ACCEPTED"].includes(ride.status);

    const canRequest = pickup && destination && !requesting && !rideIsActive;

    return (

        <Paper

            sx={{

                height: "calc(100vh - 88px)",

                p: 3,

                display: "flex",

                flexDirection: "column",

                overflowY: "auto",

            }}

        >

            <Typography

                variant="h5"

                fontWeight={700}

                gutterBottom

            >

                Book a ride

            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2" sx={{ mb: 1 }}>

                Pickup Location

            </Typography>

            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>

                <LocationSearch

                    label="Search pickup address"

                    value={pickup}

                    onSelect={setPickup}

                />

                {pickup && (

                    <IconButton
                        size="small"
                        onClick={() => setPickup?.(null)}
                        aria-label="Clear pickup"
                    >
                        ✕
                    </IconButton>

                )}

            </Box>

            <Typography color="primary" variant="caption" sx={{ mb: 2, display: "block" }}>

                {formatLocation(pickup)}

            </Typography>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>

                Destination

            </Typography>

            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>

                <LocationSearch

                    label="Search destination address"

                    value={destination}

                    onSelect={setDestination}

                />

                {destination && (

                    <IconButton
                        size="small"
                        onClick={() => setDestination?.(null)}
                        aria-label="Clear destination"
                    >
                        ✕
                    </IconButton>

                )}

            </Box>

            <Typography color="secondary" variant="caption" sx={{ mb: 2, display: "block" }}>

                {formatLocation(destination)}

            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>

                Tip: you can also click the map to set pickup / destination.

            </Typography>

            {route && (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "background.default",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        px: 2,
                        py: 1.25,
                        mb: 2,
                    }}
                >

                    <Box>
                        <Typography variant="caption" color="text.secondary">Distance</Typography>
                        <Typography variant="subtitle2">{(route.distance / 1000).toFixed(2)} km</Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">Route time</Typography>
                        <Typography variant="subtitle2">{Math.round(route.duration / 60)} min</Typography>
                    </Box>

                </Box>

            )}

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2">

                Estimated ETA (AI)

            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>

                {eta ? `${eta} min` : "--"}

            </Typography>

            <Typography variant="subtitle2">

                Recommended Driver

            </Typography>

            {

                driver ?

                (

                    <Stack spacing={0.5} sx={{ mb: 2 }}>

                        <Typography variant="body2">

                            Driver #{driver.driver_id} · ⭐ {driver.rating} ({driver.total_trips} trips)

                        </Typography>

                        <Typography variant="body2" color="text.secondary">

                            {driver.distance} km away · match score {driver.score}

                        </Typography>

                    </Stack>

                )

                :

                (

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>

                        No recommendation yet

                    </Typography>

                )

            }

            <Typography variant="subtitle2">

                Fraud Risk

            </Typography>

            <Box sx={{ mb: 3 }}>

                {

                    fraud ?

                    (

                        <Chip

                            label={fraud}

                            color={fraud === "LOW" ? "success" : "error"}

                            sx={{ mt: 1 }}

                        />

                    )

                    :

                    (

                        <Chip label="Unknown" sx={{ mt: 1 }} />

                    )

                }

            </Box>

            {

                ride &&

                (

                    <Alert
                        severity={rideIsActive ? "info" : "success"}
                        sx={{ mb: 2 }}
                        icon={false}
                    >

                        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>

                            <Typography variant="subtitle2">Ride #{ride.id}</Typography>

                            <Chip
                                size="small"
                                label={ride.status}
                                color={STATUS_COLOR[ride.status] || "default"}
                            />

                        </Stack>

                        <Typography variant="body2">
                            ৳{ride.fare} · {ride.distance_km.toFixed(2)} km
                            {ride.driver_id ? ` · driver #${ride.driver_id}` : " · finding a driver..."}
                        </Typography>

                    </Alert>

                )

            }

            {

                rideError &&

                (

                    <Alert severity="error" sx={{ mb: 2 }}>

                        {rideError}

                    </Alert>

                )

            }

            {rideIsActive ? (

                <Button

                    variant="outlined"

                    color="error"

                    fullWidth

                    disabled={cancelling}

                    onClick={onCancelRide}

                    sx={{ mt: "auto", height: 50 }}

                >

                    {cancelling ? "Cancelling..." : "Cancel Ride"}

                </Button>

            ) : (

                <Button

                    variant="contained"

                    fullWidth

                    disabled={!canRequest}

                    onClick={onRequestRide}

                    sx={{ mt: "auto", height: 50 }}

                >

                    {requesting ? "Requesting..." : "Request Ride"}

                </Button>

            )}

        </Paper>

    );

}
