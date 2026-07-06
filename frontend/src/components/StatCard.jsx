function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "18px",
          color: "#0F172A",
          fontSize: "36px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;