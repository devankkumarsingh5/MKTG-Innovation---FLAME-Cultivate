import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Monitor, Users, GitMerge,
  UserCircle, ChevronLeft, ChevronRight, Flame
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "course-builder", label: "Course Builder", icon: BookOpen, path: "/course-builder" },
  { id: "session-hub", label: "Session Hub", icon: Monitor, path: "/session-hub" },
  { id: "talent-board", label: "Talent Board", icon: Users, path: "/talent-board" },
  { id: "pipeline", label: "Pipeline", icon: GitMerge, path: "/pipeline" },
  { id: "profile", label: "My Profile", icon: UserCircle, path: "/profile" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className="h-screen bg-white border-r border-[#e2e8f0] flex flex-col transition-all duration-300 sticky top-0 shrink-0 z-40"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center border-b border-[#e2e8f0] overflow-hidden px-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 bg-[#d4a017] rounded-lg flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="flex items-baseline gap-0 whitespace-nowrap">
                <span className="text-[#1e3a5f] text-base" style={{ fontWeight: 700 }}>FLAME</span>
                <span className="text-[#d4a017] text-base ml-1" style={{ fontWeight: 600 }}>Cultivate</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group ${
                    isActive
                      ? "bg-[#fef3c7] text-[#1e3a5f]"
                      : "text-[#4a5568] hover:bg-[#f8f9fa] hover:text-[#1e3a5f]"
                  }`}
                >
                  {/* Active gold left border */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4a017] rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#d4a017]" : ""}`} />
                  {!collapsed && (
                    <span className="text-sm truncate">{item.label}</span>
                  )}
                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-2 py-1 bg-[#1e3a5f] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-[#e2e8f0]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[#4a5568] hover:bg-[#f8f9fa] hover:text-[#1e3a5f] transition-colors text-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
