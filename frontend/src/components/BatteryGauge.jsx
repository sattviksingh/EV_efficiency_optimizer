function BatteryGauge({ battery = 82 }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 8px rgba(0,0,0,.1)",
      }}
    >
      <h3>🔋 Battery</h3>

      <h1>{battery}%</h1>

      <div
        style={{
          width: "100%",
          height: "18px",
          background: "#ddd",
          borderRadius: "30px",
        }}
      >
        <div
          style={{
            width: `${battery}%`,
            height: "100%",
            background: "#22c55e",
            borderRadius: "30px",
            transition: "0.5s",
          }}
        />
      </div>
    </div>
  );
}

export default BatteryGauge;