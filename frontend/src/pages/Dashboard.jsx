import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import EfficiencyChart from "../components/EfficiencyChart";
import TripTable from "../components/TripTable";
import TripForm from "../components/TripForm";
import PredictionCard from "../components/PredictionCard";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) {
    return (
      <div
        style={{
          padding: "40px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#eef3f9",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            color: "#1e293b",
          }}
        >
          Dashboard
        </h1>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <StatCard
            title="🚗 Total Trips"
            value={stats.total_trips}
          />

          <StatCard
            title="🛣 Total Distance"
            value={`${stats.total_distance} km`}
          />

          <StatCard
            title="⚡ Average Speed"
            value={`${stats.average_speed} km/h`}
          />

          <StatCard
            title="🔋 Efficiency"
            value={stats.average_efficiency}
          />
        </div>

        {/* Chart */}
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <EfficiencyChart />
        </div>

        {/* Bottom Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
            alignItems: "start",
          }}
        >
          <div>
            <TripTable />
          </div>

          <div>
            <TripForm />

            <PredictionCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;