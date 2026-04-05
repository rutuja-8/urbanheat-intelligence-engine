const Settings = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">

      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <p className="text-gray-400 mb-6">
        Configure system preferences
      </p>

      <div className="space-y-4">

        <div className="bg-[#111827] p-4 rounded-xl border border-[#1f2937]">
          <label className="block text-sm mb-2">Temperature Threshold</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-[#0b0f19] border border-[#1f2937]"
            placeholder="Enter value"
          />
        </div>

        <div className="bg-[#111827] p-4 rounded-xl border border-[#1f2937]">
          <label className="block text-sm mb-2">Update Interval (mins)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-[#0b0f19] border border-[#1f2937]"
            placeholder="5"
          />
        </div>

      </div>

    </div>
  );
};

export default Settings;