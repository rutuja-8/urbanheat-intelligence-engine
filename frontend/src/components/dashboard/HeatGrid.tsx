import { puneZones } from "../../data/puneData";

const getColor = (t: number) => {
  if (t >= 41) return "bg-red-600";
  if (t >= 39) return "bg-orange-500";
  if (t >= 37) return "bg-yellow-400 text-black";
  return "bg-cyan-500";
};

export const HeatGrid = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="dashboard-title mb-4">
             Thermal Trap Grid
          </h2>
          <p className="text-xs text-gray-400">
            Click a zone for details
          </p>
        </div>

        <div className="text-xs text-gray-400 flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-red-500" />
          Low → Critical
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {puneZones.map((z, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl text-white font-semibold ${getColor(
              z.temperature
            )}`}
          >
            <div className="text-xs truncate">{z.name}</div>
            <div className="text-xl">{z.temperature}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};