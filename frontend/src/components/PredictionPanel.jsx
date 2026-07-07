import { useState } from "react";
import api from "../services/api";

function PredictionPanel() {
  const defaultForm = {
    battery: 85,
    distance: 35,
    speed: 55,
    temperature: 25,
    traffic: "Medium",
  };

  const [form, setForm] = useState(defaultForm);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "15px",
    background: "#ffffff",
    color: "#0f172a",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#334155",
  };

  const handleChange = (e) => {
    setPrediction(null);

    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const predict = async () => {
    setLoading(true);

    try {
      const res = await api.post("/predict", form);
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    }

    setLoading(false);
  };

  const reset = () => {
    setForm(defaultForm);
    setPrediction(null);
  };

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#0f172a",
          textAlign: "center",
        }}
      >
        🤖 AI Prediction
      </h2>

      <label style={labelStyle}>Battery (%)</label>
      <input
        type="number"
        name="battery"
        value={form.battery}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Distance (km)</label>
      <input
        type="number"
        name="distance"
        value={form.distance}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Average Speed (km/h)</label>
      <input
        type="number"
        name="speed"
        value={form.speed}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Temperature (°C)</label>
      <input
        type="number"
        name="temperature"
        value={form.temperature}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Traffic</label>
      <select
        name="traffic"
        value={form.traffic}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        onClick={predict}
        style={{
          width: "100%",
          padding: "14px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Predicting..." : "🚀 Predict"}
      </button>

      <button
        onClick={reset}
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "10px",
          background: "#64748b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🔄 Reset
      </button>

      {prediction && (
        <div style={{ marginTop: "25px" }}>
          <div
            style={{
              background: "#dcfce7",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          >
            <strong>🔋 Predicted Range</strong>
            <h2
              style={{
                margin: "8px 0 0",
                color: "#166534",
              }}
            >
              {prediction.predicted_range} km
            </h2>
          </div>

          <div
            style={{
              background: "#dbeafe",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          >
            <strong>⚡ Battery Usage</strong>
            <h2
              style={{
                margin: "8px 0 0",
                color: "#1d4ed8",
              }}
            >
              {prediction.battery_usage} kWh
            </h2>
          </div>

          <div
            style={{
              background: "#fef9c3",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          >
            <strong>🚗 Efficiency Score</strong>
            <h2
              style={{
                margin: "8px 0 0",
                color: "#a16207",
              }}
            >
              {prediction.efficiency_score}
            </h2>
          </div>

          <div
            style={{
              background: "#ede9fe",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          >
            <strong>⭐ Driver Score</strong>
            <h2
              style={{
                margin: "8px 0 0",
                color: "#6d28d9",
              }}
            >
              {prediction.driving_score}/100
            </h2>
          </div>

          <div
            style={{
              background: "#fee2e2",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <strong>💡 Recommendation</strong>

            <p
              style={{
                marginTop: "8px",
                fontSize: "16px",
                color: "#991b1b",
              }}
            >
              {prediction.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionPanel;