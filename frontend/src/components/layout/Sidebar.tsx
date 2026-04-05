import { Link, useLocation } from "react-router-dom";
import {
  Flame,
  LayoutDashboard,
  Map,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export const Sidebar = ({ isOpen, toggle }: Props) => {
  const location = useLocation();

  return (
    <div
      className={`
        ${isOpen ? "w-64" : "w-20"}
        min-h-screen bg-[#0f172a] border-r border-[#1f2937]
        p-4 transition-all duration-300
      `}
    >
      {/* Top */}
      <div className="flex items-center justify-between mb-8">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-red-500">
              <Flame className="text-white w-5 h-5" />
            </div>
            <span className="text-white font-semibold">Dashboard</span>
          </div>
        )}

        {/* Toggle Button */}
        <button onClick={toggle}>
          <Menu className="text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* Menu */}
      <div className="space-y-3 text-sm">

        <SidebarItem
          to="/"
          icon={LayoutDashboard}
          label="Overview"
          isOpen={isOpen}
          active={location.pathname === "/"}
        />

        <SidebarItem
          to="/map"
          icon={Map}
          label="Heat Map"
          isOpen={isOpen}
          active={location.pathname === "/map"}
        />

        <SidebarItem
          to="/analytics"
          icon={BarChart3}
          label="Analytics"
          isOpen={isOpen}
          active={location.pathname === "/analytics"}
        />

        <SidebarItem
          to="/settings"
          icon={Settings}
          label="Settings"
          isOpen={isOpen}
          active={location.pathname === "/settings"}
        />

      </div>
    </div>
  );
};

type ItemProps = {
  to: string;
  icon: any;
  label: string;
  isOpen: boolean;
  active?: boolean;
};

const SidebarItem = ({ to, icon: Icon, label, isOpen, active }: ItemProps) => {
  return (
    <Link to={to}>
      <div
        className={`
          flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
          ${
            active
              ? "bg-[#1f2937] text-white"
              : "text-gray-400 hover:text-white hover:bg-[#1f2937]"
          }
        `}
      >
        <Icon size={18} />
        {isOpen && <span>{label}</span>}
      </div>
    </Link>
  );
};