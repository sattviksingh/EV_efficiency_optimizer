import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Header from "../components/Header";

import StatCard from "../components/StatCard";
import BatteryGauge from "../components/BatteryGauge";
import DriverScore from "../components/DriverScore";
import PredictionPanel from "../components/PredictionPanel";

import EfficiencyChart from "../components/EfficiencyChart";
import TripTable from "../components/TripTable";
import TripForm from "../components/TripForm";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "28px",
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
          background: "#f1f5f9",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Header />

        {/* ================= Stats ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <StatCard
            title="🚗 Total Trips"
            value={stats.total_trips}
          />

          <StatCard
            title="📍 Distance"
            value={`${stats.total_distance} km`}
          />

          <StatCard
            title="⚡ Avg Efficiency"
            value={`${stats.average_efficiency}`}
          />

          <StatCard
            title="🏎 Avg Speed"
            value={`${stats.average_speed} km/h`}
          />
        </div>

        {/* ================= AI Cards ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <BatteryGauge battery={82} />

          <DriverScore score={91} />

          <PredictionPanel />
        </div>

        {/* ================= Chart ================= */}

        <div
          style={{
            marginTop: "35px",
          }}
        >
          <EfficiencyChart />
        </div>

        {/* ================= Bottom Section ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
            marginTop: "35px",
          }}
        >
          <TripTable />

          <TripForm />
        </div>
      </div>
    </>
  );
}

export default Dashboard;