import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Sidebar from "../components/sidebar/Sidebar";
import MapView from "../components/map/MapView";

import { getToken } from "../services/auth";
import { requestRide } from "../services/ride";

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

    async function handleRequestRide() {

        if (!pickup || !destination) return;

        if (!getToken()) {

            navigate("/login");

            return;

        }

        setRequesting(true);
        setRideError("");
        setRide(null);

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
                    eta={eta}
                    driver={driver}
                    fraud={fraud}

                    setPickup={setPickup}
                    setDestination={setDestination}

                    onRequestRide={handleRequestRide}
                    requesting={requesting}
                    rideError={rideError}
                    ride={ride}

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

                />

            </Grid>

        </Grid>

    );

}
