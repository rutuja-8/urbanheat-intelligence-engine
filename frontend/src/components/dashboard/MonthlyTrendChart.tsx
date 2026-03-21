import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", temp: 30, heat: 10 },
  { month: "Feb", temp: 32, heat: 15 },
  { month: "Mar", temp: 35, heat: 25 },
  { month: "Apr", temp: 38, heat: 45 },
  { month: "May", temp: 42, heat: 60 },
  { month: "Jun", temp: 40, heat: 30 },
  { month: "Jul", temp: 36, heat: 15 },
];

export const MonthlyTrendChart = () => {
  return (
    <>
      <h2 className="dashboard-title mb-4">
         Monthly Trend Analysis
      </h2>
      <p className="text-xs text-gray-400 mb-3">
        Avg. temperature & detected heat traps
      </p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />

            <Bar dataKey="heat" fill="#7c2d12" radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#facc15"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};