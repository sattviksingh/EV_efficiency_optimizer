function DriverScore({ score = 91 }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 8px rgba(0,0,0,.1)",
      }}
    >
      <h3>🚗 Driver Score</h3>

      <h1>{score}/100</h1>

      <progress
        value={score}
        max={100}
        style={{
          width: "100%",
          height: "20px",
        }}
      />
    </div>
  );
}

export default DriverScore;