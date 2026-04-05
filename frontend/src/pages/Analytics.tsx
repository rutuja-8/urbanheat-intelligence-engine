const Analytics = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">

      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <p className="text-gray-400 mb-6">
        Advanced insights and ML-based analysis
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <div className="bg-[#111827] p-4 rounded-xl border border-[#1f2937]">
          <h3 className="text-sm text-gray-400">Hottest Zone</h3>
          <p className="text-xl font-bold text-red-400">Hinjewadi</p>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl border border-[#1f2937]">
          <h3 className="text-sm text-gray-400">Avg Temperature</h3>
          <p className="text-xl font-bold">37.5°C</p>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl border border-[#1f2937]">
          <h3 className="text-sm text-gray-400">Critical Zones</h3>
          <p className="text-xl font-bold text-red-500">3</p>
        </div>

      </div>

      {/* Placeholder */}
      <div className="bg-[#111827] p-10 rounded-xl border border-[#1f2937] text-center text-gray-400">
        📊 Charts & ML Insights will be added here
      </div>

    </div>
  );
};

export default Analytics;