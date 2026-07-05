import {
  LayoutDashboard,
  
  Flame,
  Folder,
  Target,
  Settings,
  BarChart3,
} from "lucide-react";
import profileImg from "../img/profile-img.jpeg"

const links = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Analytics",
    icon: BarChart3,
  },


  {
    title: "Streaks",
    icon: Flame,
  },

  {
    title: "Projects",
    icon: Folder,
  },

  {
    title: "Goals",
    icon: Target,
  },

  {
    title: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <div
      className="w-70 flex flex-col border-r border-slate-950 bg-slate-900 fixed top-0
      left-0 h-screen "
    >
      <p className="px-4 py-6 text-3xl font-bold text-gray-200 ">
        Code Tracker
      </p>
      <div className="flex felx-row p-4 gap-3 items-center w-full">
        <div className="flex justify-center items-center rounded-full w-20 h-20 bg-white border border-slate-950">
          <img
            src={profileImg}
            className="rounded-full w-18 h-18 object-cover transition-transform duration-300 hover:scale-112 origin-center "
          />
        </div>
        <div>
          <p className="text-gray-300 text-lg">Welcome Clement</p>
        </div>
      </div>
      <div
        className="
      flex flex-col justify-center"
      >
        {links.map((item) => (
          <div
            key={item.title}
            className="flex flex-row gap-4 p-4 items-center text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-950 transition"
          >
            <item.icon size={20} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
