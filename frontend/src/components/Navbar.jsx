import { Search, Bell, Moon, Sun, User } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className="fixed top-0 left-72 right-0 h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-6 z-40">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-200">Dashboard</h1>
        <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* Search */}
      <div
        className={`
        flex items-center bg-slate-800/50 rounded-xl px-4 py-2.5 w-full max-w-md
        border transition-all duration-300
        ${
          searchFocused
            ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
            : "border-slate-700/50 hover:border-slate-600"
        }
      `}
      >
        <Search size={18} className="text-zinc-400 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search projects, languages..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent outline-none text-white w-full placeholder:text-zinc-500 text-sm"
        />
        <kbd className="hidden sm:block text-xs text-zinc-500 bg-slate-700/50 px-2 py-0.5 rounded border border-slate-600">
          ⌘K
        </kbd>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-slate-800/50 transition-colors group">
          <Bell
            size={20}
            className="text-zinc-400 group-hover:text-white transition-colors"
          />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-xl hover:bg-slate-800/50 transition-colors group"
        >
          {isDark ? (
            <Moon
              size={20}
              className="text-zinc-400 group-hover:text-yellow-400 transition-colors"
            />
          ) : (
            <Sun
              size={20}
              className="text-zinc-400 group-hover:text-yellow-400 transition-colors"
            />
          )}
        </button>

        <div className="w-px h-8 bg-slate-700/50"></div>

        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 hover:scale-105 transition-transform duration-200 flex items-center justify-center">
          <User size={16} className="text-white" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
