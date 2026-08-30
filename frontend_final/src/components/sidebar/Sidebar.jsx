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

export default function Sidebar({

    pickup,
    destination,
    eta,
    driver,
    fraud,

    setPickup,
    setDestination,

    onRequestRide,
    requesting,
    rideError,
    ride,

}) {

    const formatLocation = (location) => {

        if (!location) return "Not Selected";

        if (location.name) return location.name;

        return `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;

    };

    const canRequest = pickup && destination && !requesting;

    return (

        <Paper

            elevation={4}

            sx={{

                height: "calc(100vh - 80px)",

                p: 3,

                borderRadius: 3,

                display: "flex",

                flexDirection: "column",

                overflowY: "auto",

            }}

        >

            <Typography

                variant="h5"

                fontWeight="bold"

                gutterBottom

            >

                🚖 Ride Booking

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

            <Typography color="secondary" variant="caption" sx={{ mb: 3, display: "block" }}>

                {formatLocation(destination)}

            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>

                Tip: you can also click the map to set pickup / destination.

            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2">

                Estimated ETA

            </Typography>

            <Typography variant="h6">

                {eta ? `${eta} min` : "--"}

            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2">

                Recommended Driver

            </Typography>

            {

                driver ?

                (

                    <Stack spacing={1}>

                        <Typography>

                            Driver #{driver.driver_id}

                        </Typography>

                        <Typography>

                            ⭐ {driver.rating} ({driver.total_trips} trips)

                        </Typography>

                        <Typography>

                            {driver.distance} km away

                        </Typography>

                    </Stack>

                )

                :

                (

                    <Typography>

                        No recommendation yet

                    </Typography>

                )

            }

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2">

                Fraud Risk

            </Typography>

            {

                fraud ?

                (

                    <Chip

                        label={fraud}

                        color={

                            fraud === "LOW"

                                ? "success"

                                : fraud === "MEDIUM"

                                ? "warning"

                                : "error"

                        }

                        sx={{ mt: 1 }}

                    />

                )

                :

                (

                    <Chip

                        label="Unknown"

                        color="default"

                    />

                )

            }

            {

                ride &&

                (

                    <Alert severity="success" sx={{ mt: 3 }}>

                        Ride #{ride.id} requested — status: {ride.status}, fare: ৳{ride.fare}

                    </Alert>

                )

            }

            {

                rideError &&

                (

                    <Alert severity="error" sx={{ mt: 3 }}>

                        {rideError}

                    </Alert>

                )

            }

            <Button

                variant="contained"

                fullWidth

                disabled={!canRequest}

                onClick={onRequestRide}

                sx={{

                    mt: "auto",

                    height: 50,

                }}

            >

                {requesting ? "Requesting..." : "Request Ride"}

            </Button>

        </Paper>

    );

}
