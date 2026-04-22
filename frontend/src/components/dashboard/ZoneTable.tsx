import { useEffect, useState } from "react";

type Zone = {
  name: string;
  temperature: number;
  riskLevel: string;
  latitude?: number;
  longitude?: number;
  cluster?: number;
};

export const ZoneTable = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/clusters/");
        const data = await res.json();

        console.log("TABLE DATA:", data);

        setZones(data);        // ✅ update state
        setLoading(false);     // ✅ VERY IMPORTANT
      } catch (err) {
        console.error(err);
        setLoading(false);     // ✅ avoid infinite loading
      }
    };

    fetchData();
  }, []);  
  return (
    <>
      <h2 className="dashboard-title mb-4">
        Zone Risk Assessment
      </h2>

      <p className="text-xs text-gray-400 mb-4">
          {loading ? "Loading..." : `${zones.length} zones analyzed`}
        </p>

      {loading && <p className="text-gray-400">Loading...</p>}

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-[#1f2937]">
            <th className="p-2">Zones</th>
            <th className="p-2">Temp</th>
            <th className="p-2">Risk</th>
          </tr>
        </thead>

        <tbody>
          {zones.map((z) => (
            <tr
              key={z.name} // ✅ IMPORTANT FIX
              className="border-b border-[#1f2937] hover:bg-[#1f2937]/40"
            >
              <td className="p-2">{z.name}</td>

              <td className="p-2 text-orange-400">
                {z.temperature}°
              </td>

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