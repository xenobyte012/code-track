import { Search, Bell, Moon } from "lucide-react";

function Navbar() {
  return (
    <nav
      className="

      top-0
      left-0
      w-full
      h-20
      bg-slate-900
      border-b
      border-slate-800
      flex
      items-center
      justify-between
      px-6
      border-r border-slate-950
      "
    >
      {/* Search */}
      <div
        className="
        flex
        items-center
        bg-slate-800
        rounded-xl
        px-4
        py-3
        w-full
        max-w-md
        border border-slate-950
        "
      >
        <Search size={18} className="text-zinc-400 mr-3" />

        <input
          type="text"
          placeholder="Search..."
          className="
          bg-transparent
          outline-none
          text-white
          w-full
          placeholder:text-zinc-500
          "
        />
      </div>

      {/* Right Side */}
      <div
        className="
        flex
        items-center
        gap-6
        ml-6
        "
      >
        <Bell
          className="
          size-6
          text-zinc-400
          hover:text-white
          cursor-pointer
          transition
          "
        />

        <Moon
          className="
          size-6
          text-zinc-400
          hover:text-white
          cursor-pointer
          transition
          "
        />
      </div>
    </nav>
  );
}

export default Navbar;