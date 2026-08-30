import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ControlPanel from "./components/ControlPanel";
import MapView from "./components/MapView";

import { getRoute } from "./services/routing";
import { initialDrivers } from "./data/drivers";

function App() {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);

  const [drivers, setDrivers] = useState(initialDrivers);

  // Load route whenever pickup/destination changes
  useEffect(() => {
    async function loadRoute() {
      if (pickup && destination) {
        const result = await getRoute(pickup, destination);
        setRoute(result);
      } else {
        setRoute(null);
      }
    }

    loadRoute();
  }, [pickup, destination]);

  // Driver simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers((oldDrivers) =>
        oldDrivers.map((driver) => {
          let direction = driver.direction;
          let newLat = driver.lat + driver.speed * direction;

          if (newLat > 23.82 || newLat < 23.79) {
            direction *= -1;
            newLat = driver.lat + driver.speed * direction;
          }

          return {
            ...driver,
            lat: newLat,
            direction,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 60px)",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            width: "360px",
            background: "#f5f5f5",
            padding: "20px",
            boxShadow: "2px 0px 10px rgba(0,0,0,.15)",
            overflowY: "auto",
          }}
        >
          <ControlPanel
            pickup={pickup}
            destination={destination}
            setPickup={setPickup}
            setDestination={setDestination}
            route={route}
          />
        </div>

        {/* Map */}
        <div
          style={{
            flex: 1,
          }}
        >
          <MapView
            pickup={pickup}
            destination={destination}
            route={route}
            drivers={drivers}
          />
        </div>
      </div>
    </>
  );
}

export default App;