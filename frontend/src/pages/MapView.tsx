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
import HeatGraph from "../components/HeatGraph";

// 🔥 Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔥 Type
type Zone = {
  name: string;
  temperature: number;
  latitude: number;
  longitude: number;
  riskLevel: string;
  cluster?: number;
};

// 🔥 Heat Layer
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
    const simulate = () => {
      fetch("http://127.0.0.1:8000/api/simulate/", {
        method: "POST",
      });
    };

    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/clusters/");
        const data = await res.json();

        console.log("ZONES:", data); // 🔍 debug

        setZones(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    simulate(); // run once
    fetchData();

    const simInterval = setInterval(simulate, 5000);   // slower simulation
    const dataInterval = setInterval(fetchData, 1000); // fast UI update

    return () => {
      clearInterval(simInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const getClusterColor = (cluster?: number) => {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[(cluster ?? 0) % colors.length];
  };

  return (
    <div className="h-screen w-full relative">

      {/* Header */}
      <div className="p-4 bg-[#0b0f19] text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Pune Heat Analysis</h1>

        <div className="flex gap-2">
          <button onClick={() => setMode("heatmap")}>Heatmap 🔥</button>
          <button onClick={() => setMode("points")}>Points 📍</button>
        </div>
      </div>

      {/* Graph */}
      <div className="absolute bottom-5 left-5 w-[400px] z-[1000]">
        <HeatGraph />
      </div>

      {/* Map */}
      <MapContainer
        center={[18.57, 73.85]}   // ✅ adjusted for PCMC
        zoom={11}
        className="h-[90vh] w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mode === "heatmap" && <HeatLayer zones={zones} />}

        {mode === "points" &&
          zones.map((zone) => (
            <CircleMarker
              key={zone.name}   // ✅ CRITICAL FIX
              center={[zone.latitude, zone.longitude]}
              radius={8}
              pathOptions={{ color: getClusterColor(zone.cluster) }}
            >
              <Popup>
                {zone.name} - {zone.temperature}°C
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;