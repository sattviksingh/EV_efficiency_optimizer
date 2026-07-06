import { useState } from "react";
import api from "../services/api";

function TripForm() {
  const [trip, setTrip] = useState({
    driver: "",
    distance: "",
    battery: "",
    speed: "",
    efficiency: "",
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/trips", {
        driver: trip.driver,
        distance: Number(trip.distance),
        battery: Number(trip.battery),
        speed: Number(trip.speed),
        efficiency: Number(trip.efficiency),
      });

      alert("Trip Added Successfully!");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add trip");
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          color: "#0F172A",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Add New Trip
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="driver"
          placeholder="Driver Name"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="distance"
          type="number"
          placeholder="Distance (km)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="battery"
          type="number"
          placeholder="Battery (%)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="speed"
          type="number"
          placeholder="Average Speed (km/h)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="efficiency"
          type="number"
          step="0.1"
          placeholder="Efficiency"
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Add Trip
        </button>
      </form>
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

export default TripForm;