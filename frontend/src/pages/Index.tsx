import { motion } from "framer-motion";
import {
  Thermometer,
  AlertTriangle,
  TreePine,
  Building2,
  Flame,
  Wind,
} from "lucide-react";

import { StatCard } from "../components/dashboard/StatCard";
import { HeatGrid } from "../components/dashboard/HeatGrid";
import { TemperatureChart } from "../components/dashboard/TemperatureChart";
import { MonthlyTrendChart } from "../components/dashboard/MonthlyTrendChart";
import { ZoneTable } from "../components/dashboard/ZoneTable";
import { ClusterChart } from "../components/dashboard/ClusterChart";

import { puneZones } from "../data/puneData";

const Index = () => {
  const criticalZones = puneZones.filter(
    (z) => z.riskLevel === "Critical"
  ).length;

  const avgTemp = (
    puneZones.reduce((s, z) => s + z.temperature, 0) /
    puneZones.length
  ).toFixed(1);

  const maxTemp = Math.max(...puneZones.map((z) => z.temperature));

  const avgVeg = (
    puneZones.reduce((s, z) => s + z.vegetationIndex, 0) /
    puneZones.length
  ).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0b0f19] text-gray-100">

      {/* Header */}
      <header className="border-b border-[#1f2937]">
        <div className="flex items-center justify-between py-4 px-6">

          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
              <Flame className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                Urban Thermal Trapping Engine
              </h1>
              <p className="text-xs text-gray-400 font-mono">
                PUNE, MAHARASHTRA • LIVE ANALYSIS
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-400">
                {criticalZones} CRITICAL
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1">
              <Wind className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-400">
                Updated 5m ago
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 space-y-6">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Peak Temperature"
            value={`${maxTemp}°C`}
            subtitle="Hinjewadi IT Park"
            icon={Thermometer}
            variant="hot"
            trend={{ value: 3.2, label: "vs last week" }}
          />

          <StatCard
            title="Avg Temperature"
            value={`${avgTemp}°C`}
            subtitle="Across zones"
            icon={Flame}
            variant="warning"
            trend={{ value: 1.8, label: "vs last week" }}
          />

          <StatCard
            title="Critical Zones"
            value={String(criticalZones)}
            subtitle="Immediate attention needed"
            icon={AlertTriangle}
            variant="hot"
            trend={{ value: 12, label: "vs last month" }}
          />

          <StatCard
            title="Vegetation Index"
            value={avgVeg}
            subtitle="NDVI average"
            icon={TreePine}
            variant="cool"
            trend={{ value: -5.1, label: "declining" }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] border border-[#1f2937] rounded-xl p-5 shadow-lg">
            <TemperatureChart />
          </div>

          <div className="bg-[#0f172a] border border-[#1f2937] rounded-xl p-5 shadow-lg">
            <MonthlyTrendChart />
          </div>
        </div>

        {/* HeatGrid + Cluster */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] border border-[#1f2937] rounded-xl p-5 shadow-lg">
            <HeatGrid />
          </div>

          <div className="bg-[#0f172a] border border-[#1f2937] rounded-xl p-5 shadow-lg">
            <ClusterChart />
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0f172a] border border-[#1f2937] rounded-xl p-5 shadow-lg">
          <ZoneTable />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between border-t border-[#1f2937] pt-4"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">
              ASEP Project • Built by Rajas Ghongade
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500" />
            <span className="text-xs text-gray-400 font-mono">
              Algorithms: K-Means • DBSCAN • Random Forest
            </span>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Index;