import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

export default function MapView({
  pickup,
  destination,
  route,
  drivers,
}) {
  const center = [23.8103, 90.4125];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {/* Map */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Default User */}
      <Marker position={center}>
        <Popup>You</Popup>
      </Marker>

      {/* Pickup */}
      {pickup && (
        <Marker position={[pickup.lat, pickup.lon]}>
          <Popup>
            <strong>Pickup</strong>
            <br />
            {pickup.name}
          </Popup>
        </Marker>
      )}

      {/* Destination */}
      {destination && (
        <Marker position={[destination.lat, destination.lon]}>
          <Popup>
            <strong>Destination</strong>
            <br />
            {destination.name}
          </Popup>
        </Marker>
      )}

      {/* Driver Markers */}
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          position={[driver.lat, driver.lon]}
        >
          <Popup>
            <strong>{driver.name}</strong>
            <br />
            Moving...
          </Popup>
        </Marker>
      ))}

      {/* Route */}
      {route && (
        <Polyline
          positions={route.coordinates}
          pathOptions={{
            color: "#1976D2",
            weight: 6,
          }}
        />
      )}
    </MapContainer>
  );
}