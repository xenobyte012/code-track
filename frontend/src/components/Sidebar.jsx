import {
  LayoutDashboard,
  Flame,
  Folder,
  Target,
  Settings,
  BarChart3,
  
} from "lucide-react";
import profileImg from "../img/profile-img.jpeg";
import React, { useState, useEffect } from "react";

const links = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Analytics", icon: BarChart3 },
  { title: "Streaks", icon: Flame },
  { title: "Projects", icon: Folder },
  { title: "Goals", icon: Target },
  { title: "Settings", icon: Settings },
];

function Sidebar() {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [imageData, setImageData] = useState({
    avatarUrl: "",
    name: "",
    username: "",
  });
  const [loading, setLoading] = useState(true);

  const profilePicture = async () => {
    try {
      const res = await fetch(`/api/github/profile`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned HTML. Check API URL.`);
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      setImageData({
        avatarUrl: data.avatarUrl,
        name: data.name || data.username,
        username: data.username,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error.message);
      setImageData((prev) => ({ ...prev, avatarUrl: profileImg }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    profilePicture();
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 fixed top-0 left-0 h-screen z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
        <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center">
          <svg
            xmlns="http://w3.org"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          Code Tracker
        </span>
      </div>

      {/* Profile */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="relative">
            {loading ? (
              <div className="w-14 h-14 rounded-full bg-slate-800 animate-pulse" />
            ) : (
              <img
                src={imageData.avatarUrl || profileImg}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-700"
              />
            )}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div className="min-w-0">
            {loading ? (
              <>
                <div className="h-4 w-24 bg-slate-800 rounded animate-pulse mb-2" />
                <div className="h-3 w-16 bg-slate-800 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-white font-semibold text-sm truncate">
                  {imageData.name || "User"}
                </p>
                <p className="text-slate-500 text-xs truncate">
                  @{imageData.username || "username"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const isActive = activeLink === item.title;
          return (
            <button
              key={item.title}
              onClick={() => setActiveLink(item.title)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon
                size={18}
                className={isActive ? "text-indigo-400" : ""}
              />
              <span>{item.title}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Current Plan</p>
          <p className="text-sm font-semibold text-white">Free Tier</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
