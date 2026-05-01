import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HeroChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 12, left: -20, bottom: 5 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#8f94aa", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#8f94aa", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(13, 13, 26, 0.95)",
            border: "1px solid rgba(255, 215, 0, 0.3)",
            borderRadius: "10px",
            color: "#fff",
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#FFD700"
          strokeWidth={2.6}
          dot={false}
          animationDuration={1200}
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#B8860B"
          strokeWidth={2.2}
          strokeDasharray="4 4"
          dot={false}
          animationDuration={1500}
        />
        <Line
          type="monotone"
          dataKey="volatility"
          stroke="#f5deb3"
          strokeWidth={1.7}
          dot={false}
          animationDuration={1700}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HeroChart;
