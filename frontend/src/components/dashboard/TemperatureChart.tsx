import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { puneZones } from "../../data/puneData";

export const TemperatureChart = () => {
  const data = puneZones.map((z) => ({
    name: z.name,
    temperature: z.temperature,
  }));

  return (
    <>
      <h2 className="dashboard-title mb-4">
         24h Temperature Profile
      </h2>
      <p className="text-xs text-gray-400 mb-3">
        Pune city average, max & min
      </p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
              }}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};