import { Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { Toaster } from "sonner";
import { Sidebar } from "./Sidebar";

export function Root() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center px-6 justify-between sticky top-0 z-30 shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <button className="p-2 text-[#4a5568] hover:bg-[#f8f9fa] rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#4a5568] hover:bg-[#f8f9fa] rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-[#e2e8f0]" />
            {/* Avatar */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1771898343647-bd979ad8cca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBleGVjdXRpdmUlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjU4MDk1NXww&ixlib=rb-4.1.0&q=80&w=80"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#e2e8f0]"
              />
              <div className="hidden sm:block">
                <p className="text-sm text-[#1e3a5f]" style={{ lineHeight: 1.2 }}>Arjun Mehta</p>
                <p className="text-xs text-[#4a5568]" style={{ lineHeight: 1.2 }}>VP Talent Strategy</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 text-[#4a5568] hover:bg-[#f8f9fa] rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1e3a5f",
            color: "#ffffff",
            border: "1px solid #2d4f7f",
          },
        }}
      />
    </div>
  );
}
