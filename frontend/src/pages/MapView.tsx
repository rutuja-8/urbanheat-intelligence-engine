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

type Zone = {
  name: string;
  temperature: number;
  latitude: number;
  longitude: number;
  riskLevel: string;
  cluster: number;
};

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
      map.removeLayer(heat);
    };
  }, [zones, map]);

  return null;
};

const MapView = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [mode, setMode] = useState<"heatmap" | "points">("heatmap");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/zones/")
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch(() => console.log("Backend not ready"));
  }, []);

  const getClusterColor = (cluster: number) => {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[cluster % colors.length];
  };

  const getClusterInsights = () => {
  if (!zones.length) return null;

  const clusterMap: Record<number, Zone[]> = {};

  zones.forEach((z) => {
    if (!clusterMap[z.cluster]) clusterMap[z.cluster] = [];
    clusterMap[z.cluster].push(z);
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

        {/* Toggle */}
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

      {/* Legend */}
      <div className="absolute bottom-5 left-5 bg-[#0f172a] p-3 rounded-lg text-xs text-white z-[1000] shadow-lg">
        <div className="font-semibold mb-2">Clusters</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span> C1
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span> C2
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span> C3
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> C4
        </div>
      </div>

{insights && (
  <div className="absolute top-20 right-5 bg-[#0f172a] p-4 rounded-xl text-sm text-white z-[1000] shadow-lg w-64">
    
    <h3 className="font-semibold mb-3">🧠 Insights</h3>

    <p className="mb-2">
      🔥 Hottest Cluster: <span className="text-red-400 font-bold">C{insights.hottestCluster + 1}</span>
    </p>

    <p className="mb-2">
      🌡 Avg Temp: <span className="font-semibold">{insights.avgTemp}°C</span>
    </p>

    <p className="text-xs text-gray-400 mt-3">
      ⚠ Urban heat hotspot detected. Consider increasing vegetation & reducing density.
    </p>
  </div>
)}

      {/* Map */}
      <MapContainer
        center={[18.5204, 73.8567] as [number, number]}
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
              center={[zone.latitude, zone.longitude] as [number, number]}
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
                🧠 Cluster: {zone.cluster}
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;