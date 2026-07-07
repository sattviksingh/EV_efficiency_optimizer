function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 8px rgba(0,0,0,.1)",
        transition: "0.3s",
      }}
    >
      <h4
        style={{
          color: "#64748b",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h1
        style={{
          margin: 0,
          color: "#0f172a",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;