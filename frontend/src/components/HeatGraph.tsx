import { useEffect, useState } from "react";

type Zone = {
  name: string;
  temperature: number;
  latitude: number;
  longitude: number;
  riskLevel: string;
  cluster?: number;
};

const HeatGraph = () => {
  const [data, setData] = useState<Zone[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/clusters/");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Graph fetch error:", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000); // refresh graph
    return () => clearInterval(interval);
  }, []);

  return (
   <div style={{ padding: "10px", background: "#0f172a", color: "white", width: "350px" }}>
      <h3>📊 Temperature Overview</h3>

      {data.length === 0 && <p>No data available</p>}

      {data.map((zone, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <strong>{zone.name}</strong>

          <div
            style={{
              height: "10px",
              width: `${zone.temperature * 5}px`, // instead of *2
              maxWidth: "100%",
              background:
                zone.temperature > 40
                  ? "red"
                  : zone.temperature > 37
                  ? "orange"
                  : zone.temperature > 34
                  ? "yellow"
                  : "green",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          />

          <small>
            {zone.temperature}°C | {zone.riskLevel}
          </small>
        </div>
      ))}
    </div>
  );
};

export default HeatGraph;