import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet.heat";
import L from "leaflet";

// 🔥 Type
type Zone = {
  name: string;
  temperature: number;
  latitude: number;
  longitude: number;
  riskLevel: string;
  cluster?: number; // optional safety
};

// 🔥 Heat Layer Component
const HeatLayer = ({ zones }: { zones: Zone[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!zones.length) return;

    const heatData = zones.map((z) => [
      z.latitude,
      z.longitude,
      z.temperature / 50,
    ]);

    const heat = (L as any).heatLayer(heatData, {
      radius: 25,
      blur: 20,
      maxZoom: 17,
      gradient: {
        0.2: "blue",
        0.4: "cyan",
        0.6: "yellow",
        0.8: "orange",
        1.0: "red",
      },
    });

    heat.addTo(map);

    return () => {
      map.removeLayer(heat); // ✅ prevents duplication
    };
  }, [zones, map]);

  return null;
};

const MapView = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [mode, setMode] = useState<"heatmap" | "points">("heatmap");
  const [loading, setLoading] = useState(true);

  // 🔥 AUTO REFRESH (DYNAMIC)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/clusters/")
        const data = await res.json();

        console.log("DATA:", data); // debug

        setZones(data);
        setLoading(false);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000); // 🔄 every 1 sec
    return () => clearInterval(interval);
  }, []);

  // 🎨 Cluster colors
  const getClusterColor = (cluster?: number) => {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[(cluster ?? 0) % colors.length];
  };

  // 🧠 Insights
  const getClusterInsights = () => {
    if (!zones.length) return null;

    const clusterMap: Record<number, Zone[]> = {};

    zones.forEach((z) => {
      const c = z.cluster ?? 0;
      if (!clusterMap[c]) clusterMap[c] = [];
      clusterMap[c].push(z);
    });

    let hottestCluster = -1;
    let maxAvgTemp = 0;

    Object.keys(clusterMap).forEach((c) => {
      const cluster = Number(c);
      const avg =
        clusterMap[cluster].reduce((s, z) => s + z.temperature, 0) /
        clusterMap[cluster].length;

      if (avg > maxAvgTemp) {
        maxAvgTemp = avg;
        hottestCluster = cluster;
      }
    });

    return {
      hottestCluster,
      avgTemp: maxAvgTemp.toFixed(1),
    };
  };

  const insights = getClusterInsights();

  return (
    <div className="h-screen w-full relative">

      {/* Header */}
      <div className="p-4 bg-[#0b0f19] text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Pune Heat Analysis</h1>
          <p className="text-gray-400 text-sm">
            Toggle between heatmap and cluster view
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("heatmap")}
            className={`px-3 py-1 rounded ${
              mode === "heatmap"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Heatmap 🔥
          </button>

          <button
            onClick={() => setMode("points")}
            className={`px-3 py-1 rounded ${
              mode === "points"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Points 📍
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="absolute top-20 left-5 text-white z-[1000]">
          Loading data...
        </div>
      )}

      {/* Insights */}
      {insights && (
        <div className="absolute top-20 right-5 bg-[#0f172a] p-4 rounded-xl text-sm text-white z-[1000] shadow-lg w-64">
          <h3 className="font-semibold mb-3">🧠 Insights</h3>

          <p className="mb-2">
            🔥 Hottest Cluster:{" "}
            <span className="text-red-400 font-bold">
              C{insights.hottestCluster + 1}
            </span>
          </p>

          <p className="mb-2">
            🌡 Avg Temp:{" "}
            <span className="font-semibold">{insights.avgTemp}°C</span>
          </p>

          <p className="text-xs text-gray-400 mt-3">
            ⚠ Urban heat hotspot detected.
          </p>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        className="h-[90vh] w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Heatmap */}
        {mode === "heatmap" && <HeatLayer zones={zones} />}

        {/* Points */}
        {mode === "points" &&
          zones.map((zone, i) => (
            <CircleMarker
              key={i}
              center={[zone.latitude, zone.longitude]}
              radius={8}
              pathOptions={{
                color: getClusterColor(zone.cluster),
                fillOpacity: 0.7,
              }}
            >
              <Popup>
                <strong>{zone.name}</strong><br />
                🌡 {zone.temperature}°C<br />
                ⚠ {zone.riskLevel}<br />
                🧠 Cluster: {zone.cluster ?? 0}
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;