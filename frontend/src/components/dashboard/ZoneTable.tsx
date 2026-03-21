import { puneZones } from "../../data/puneData";

export const ZoneTable = () => {
  return (
    <>
      <h2 className="dashboard-title mb-4">
        Zone Risk Assessment
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        16 zones analyzed
      </p>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-[#1f2937]">
            <th className="p-2 text-left">Zone</th>
            <th className="p-2">Temp</th>
            <th className="p-2">Build %</th>
            <th className="p-2">NDVI</th>
            <th className="p-2">Score</th>
            <th className="p-2">Risk</th>
          </tr>
        </thead>

        <tbody>
          {puneZones.map((z, i) => (
            <tr
              key={i}
              className="border-b border-[#1f2937] hover:bg-[#1f2937]/40"
            >
              <td className="p-2">{z.name}</td>
              <td className="p-2 text-orange-400">{z.temperature}°</td>
              <td className="p-2">{z.buildingDensity}%</td>
              <td className="p-2 text-cyan-400">{z.vegetationIndex}</td>
              <td className="p-2">{z.score}</td>
              <td className="p-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    z.riskLevel === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : z.riskLevel === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : z.riskLevel === "Moderate"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {z.riskLevel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};