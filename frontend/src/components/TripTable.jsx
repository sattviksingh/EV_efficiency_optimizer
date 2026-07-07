import { useEffect, useState } from "react";
import api from "../services/api";

function TripTable() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api
      .get("/trips")
      .then((res) => setTrips(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 8px rgba(0,0,0,.1)",
      }}
    >
      <h3>🚗 Recent Trips</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Distance</th>
            <th>Speed</th>
            <th>Efficiency</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.driver}</td>
              <td>{trip.distance} km</td>
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