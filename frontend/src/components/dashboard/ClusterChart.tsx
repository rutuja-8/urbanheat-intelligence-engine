import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { puneZones } from "../../data/puneData";

const getColor = (risk: string) => {
  if (risk === "Critical") return "#ef4444";
  if (risk === "High") return "#f97316";
  if (risk === "Moderate") return "#eab308";
  return "#22c55e";
};

export const ClusterChart = () => {
  const data = puneZones.map((z) => ({
    x: z.vegetationIndex,
    y: z.temperature,
    risk: z.riskLevel,
  }));

  return (
    <>
      <h2 className="dashboard-title mb-4">
  K-Means Clustering
</h2>
      <p className="text-xs text-gray-400 mb-2">
        Temp vs Building Density
      </p>

      <div className="flex gap-3 text-xs mb-2 text-gray-400">
        <span className="text-red-400">● C1</span>
        <span className="text-orange-400">● C2</span>
        <span className="text-yellow-400">● C3</span>
        <span className="text-cyan-400">● C4</span>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid stroke="#1f2937" />
            <XAxis type="number" dataKey="x" stroke="#9ca3af" />
            <YAxis type="number" dataKey="y" stroke="#9ca3af" />
            <Tooltip />

            <Scatter
              data={data}
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={getColor(payload.risk)}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};