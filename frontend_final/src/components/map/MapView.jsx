import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMapEvents,
    useMap,
} from "react-leaflet";

import L from "leaflet";

import { Paper } from "@mui/material";

import { useEffect } from "react";

const carIcon = L.divIcon({
    html: '<div style="font-size:22px;line-height:28px;text-align:center;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5))">🚗</div>',
    className: "driver-marker-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

import { getRoute } from "../../services/routing";
import { predictEta } from "../../services/eta";
import { recommendDriver } from "../../services/recommendation";
import { checkFraud } from "../../services/fraud";

function MapClickHandler({

    pickup,
    destination,

    setPickup,
    setDestination,

}) {

    useMapEvents({

        click(e) {

            if (!pickup) {

                setPickup(e.latlng);

                return;

            }

            if (!destination) {

                setDestination(e.latlng);

                return;

            }

            // Third click resets ride selection
            setPickup(e.latlng);

            setDestination(null);

        },

    });

    return null;

}

function FlyToSelection({ pickup, destination }) {

    const map = useMap();

    useEffect(() => {

        if (destination) {

            map.flyTo([destination.lat, destination.lng], 14);

        } else if (pickup) {

            map.flyTo([pickup.lat, pickup.lng], 14);

        }

    }, [pickup, destination]);

    return null;

}

export default function MapView({

    pickup,
    destination,

    route,
    setRoute,

    setPickup,
    setDestination,

    setEta,
    setDriver,
    setFraud,

    driverLocation,

}) {

    // Fetch driving route when both points exist
    useEffect(() => {

        async function loadRoute() {

            if (!pickup || !destination) {

                setRoute(null);
                setEta?.(null);
                setDriver?.(null);
                setFraud?.(null);

                return;

            }

            try {

                const data = await getRoute(

                    pickup,

                    destination,

                );

                setRoute(data);

            }

            catch (err) {

                console.error(err);

            }

        }

        loadRoute();

    }, [

        pickup,

        destination,

    ]);

    // Once a route exists, run the AI features: ETA, driver recommendation, fraud risk
    useEffect(() => {

        async function loadAiInsights() {

            if (!route || !pickup) return;

            const distanceKm = route.distance / 1000;
            const durationMin = route.duration / 60;

            try {

                const eta = await predictEta(distanceKm, 2);
                setEta?.(eta.eta_minutes);

            } catch (err) {
                console.error("ETA prediction failed:", err);
            }

            try {

                const recommendation = await recommendDriver({
                    pickup_lat: pickup.lat,
                    pickup_lon: pickup.lng,
                });

                setDriver?.(
                    recommendation.driver_id
                        ? recommendation
                        : null
                );

            } catch (err) {
                console.error("Driver recommendation failed:", err);
            }

            try {

                const fare = Math.round((60 + distanceKm * 18) * 100) / 100;

                const fraud = await checkFraud({
                    trip_distance: distanceKm,
                    ride_duration: durationMin,
                    fare,
                    driver_rating: 4.8,
                    passenger_rating: 4.8,
                    driver_cancel_rate: 0.02,
                    passenger_cancel_rate: 0.01,
                    rides_today: 1,
                    gps_jump: 0,
                });

                setFraud?.(fraud.fraud ? "HIGH" : "LOW");

            } catch (err) {
                console.error("Fraud check failed:", err);
            }

        }

        loadAiInsights();

    }, [route]);

    return (

        <Paper

            sx={{

                height: "calc(100vh - 88px)",

                width: "100%",
                borderRadius: 3,

                overflow: "hidden",

            }}

        >

            <MapContainer

                center={[23.8103, 90.4125]}

                zoom={13}

                style={{

                    height: "100%",

                    width: "100%",

                }}

            >

                <TileLayer

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                    attribution="OpenStreetMap"

                />

                <MapClickHandler

                    pickup={pickup}

                    destination={destination}

                    setPickup={setPickup}

                    setDestination={setDestination}

                />

                <FlyToSelection

                    pickup={pickup}

                    destination={destination}

                />

                {

                    pickup &&

                    <Marker position={pickup}>

                        <Popup>

                            Pickup

                        </Popup>

                    </Marker>

                }

                {

                    destination &&

                    <Marker position={destination}>

                        <Popup>

                            Destination

                        </Popup>

                    </Marker>

                }

                {

                    route &&

                    <Polyline

                        positions={route.coordinates}

                        color="#2563EB"

                        weight={5}

                    />

                }

                {

                    driverLocation &&

                    <Marker position={driverLocation} icon={carIcon}>

                        <Popup>

                            Your driver

                        </Popup>

                    </Marker>

                }

            </MapContainer>

        </Paper>

    );

}
