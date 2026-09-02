import React from "react";
import { Trophy, Medal } from "lucide-react";

const projects = [
  { name: "Notes-App", commits: 120, rank: 1 },
  { name: "Dashboard-site", commits: 70, rank: 2 },
  { name: "Graduation-site", commits: 10, rank: 3 },
];

function ProjectLeaderboard() {
  const maxCommits = Math.max(...projects.map((p) => p.commits));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-gray-200">
          Project Leaderboard
        </h3>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.rank}
            className="group flex items-center gap-4 p-2 rounded-xl hover:bg-slate-800/70 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/50 text-sm font-bold text-gray-400 group-hover:bg-slate-600/50">
              {project.rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300 truncate">
                  {project.name}
                </span>
                <span className="text-xs text-gray-400">
                  {project.commits} commits
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${(project.commits / maxCommits) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectLeaderboard;
