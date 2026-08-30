import SearchBox from "./SearchBox";

export default function ControlPanel({
  pickup,
  destination,
  setPickup,
  setDestination,
  route,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          color: "#16a34a",
        }}
      >
        Book a Ride
      </h2>

      <SearchBox
        placeholder="Pickup Location"
        onSelect={setPickup}
      />

      <SearchBox
        placeholder="Destination"
        onSelect={setDestination}
      />

      <hr style={{ margin: "20px 0" }} />

      {pickup && (
        <div style={{ marginBottom: "10px" }}>
          <strong>📍 Pickup</strong>
          <br />
          <small>{pickup.name}</small>
        </div>
      )}

      {destination && (
        <div style={{ marginBottom: "15px" }}>
          <strong>🎯 Destination</strong>
          <br />
          <small>{destination.name}</small>
        </div>
      )}

      {route && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <div>
            <strong>Distance:</strong>{" "}
            {(route.distance / 1000).toFixed(2)} km
          </div>

          <div>
            <strong>Estimated Time:</strong>{" "}
            {Math.ceil(route.duration / 60)} min
          </div>

          <div>
            <strong>Estimated Fare:</strong>{" "}
            ৳{Math.round(60 + (route.distance / 1000) * 18)}
          </div>
        </div>
      )}

      <button
        disabled={!pickup || !destination}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          background: pickup && destination ? "#16a34a" : "#999",
          color: "white",
          fontSize: "16px",
          cursor: pickup && destination ? "pointer" : "not-allowed",
        }}
      >
        🚖 Book Ride
      </button>
    </div>
  );
}