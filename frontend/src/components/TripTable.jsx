import { useEffect, useState } from "react";
import api from "../services/api";

function TripTable() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get("/trips").then((res) => {
      setTrips(res.data);
    });
  }, []);

  return (
    <div
      style={{
        marginTop: "30px",
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Recent Trips</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Distance</th>
            <th>Battery</th>
            <th>Speed</th>
            <th>Efficiency</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.driver}</td>
              <td>{trip.distance}</td>
              <td>{trip.battery}%</td>
              <td>{trip.speed} km/h</td>
              <td>{trip.efficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TripTable;