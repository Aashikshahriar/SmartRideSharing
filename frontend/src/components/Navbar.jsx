export default function Navbar() {
  return (
    <nav
      style={{
        height: "60px",
        background: "#16a34a",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        fontSize: "22px",
        fontWeight: "bold",
      }}
    >
      SmartRideAI

      <div style={{ fontSize: "16px" }}>
        Login
      </div>
    </nav>
  );
}