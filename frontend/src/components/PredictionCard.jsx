import { useState } from "react";
import api from "../services/api";

function PredictionCard() {
  const [form, setForm] = useState({
    battery: "",
    distance: "",
    speed: "",
    temperature: "",
    traffic: "Low",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      const response = await api.post("/predict", {
        battery: Number(form.battery),
        distance: Number(form.distance),
        speed: Number(form.speed),
        temperature: Number(form.temperature),
        traffic: form.traffic,
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        marginTop: "25px",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#0F172A",
          marginBottom: "20px",
        }}
      >
        🤖 AI Prediction
      </h2>

      <input
        name="battery"
        type="number"
        placeholder="Battery (%)"
        value={form.battery}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="distance"
        type="number"
        placeholder="Distance (km)"
        value={form.distance}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="speed"
        type="number"
        placeholder="Speed (km/h)"
        value={form.speed}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="temperature"
        type="number"
        placeholder="Temperature (°C)"
        value={form.temperature}
        onChange={handleChange}
        style={inputStyle}
      />

      <select
        name="traffic"
        value={form.traffic}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Low">Low Traffic</option>
        <option value="Medium">Medium Traffic</option>
        <option value="High">High Traffic</option>
      </select>

      <button
        onClick={handlePredict}
        style={buttonStyle}
      >
        Predict
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "18px",
            background: "#F8FAFC",
            borderRadius: "10px",
            border: "1px solid #E2E8F0",
          }}
        >
          <h3
            style={{
              color: "#0F172A",
            }}
          >
            Prediction Result
          </h3>

          <p>
            🔋 <strong>Remaining Range:</strong> {result.predicted_range} km
          </p>

          <p>
            ⚡ <strong>Battery Usage:</strong> {result.battery_usage} kWh
          </p>

          <p>
            📈 <strong>Efficiency Score:</strong> {result.efficiency_score}
          </p>

          <p>
            💡 <strong>Recommendation:</strong> {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #CBD5E1",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563EB",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "16px",
};

export default PredictionCard;