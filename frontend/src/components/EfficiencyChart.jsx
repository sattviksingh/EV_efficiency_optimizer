import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { trip: 1, efficiency: 6.2 },
  { trip: 2, efficiency: 6.7 },
  { trip: 3, efficiency: 7.1 },
  { trip: 4, efficiency: 6.8 },
];

function EfficiencyChart() {
  return (
    <div
      style={{
        marginTop: "30px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>Efficiency Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="trip" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="efficiency"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EfficiencyChart;