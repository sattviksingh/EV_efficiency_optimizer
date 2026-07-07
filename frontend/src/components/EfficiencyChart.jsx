import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { trip: "T1", efficiency: 5.1 },
  { trip: "T2", efficiency: 5.6 },
  { trip: "T3", efficiency: 6.0 },
  { trip: "T4", efficiency: 5.8 },
  { trip: "T5", efficiency: 6.3 },
  { trip: "T6", efficiency: 6.7 },
  { trip: "T7", efficiency: 6.4 },
];

function EfficiencyChart() {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 8px rgba(0,0,0,.1)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>
        📈 Efficiency Trend
      </h3>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="trip" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EfficiencyChart;