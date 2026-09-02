import React from "react";
import { Folder, Clock } from "lucide-react";

const projects = [
  { name: "Notes-App", hours: 10, color: "from-blue-500 to-cyan-400" },
  { name: "Dashboard-site", hours: 15, color: "from-purple-500 to-pink-400" },
  { name: "Graduation-site", hours: 65, color: "from-orange-500 to-red-400" },
];

function ActiveProjects() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Folder className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-200">
          Active Projects This Week
        </h3>
      </div>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/70 transition-all duration-200 border border-transparent hover:border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-br ${project.color}`}
              ></div>
              <span className="text-sm font-medium text-gray-300">
                {project.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{project.hours}h</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveProjects;
