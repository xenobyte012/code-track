import React from 'react'

function ProjectLeaderboard() {
  return (
    <div className="bg-slate-900 border border-slate-950 rounded-xl w-full h-full p-4">
      <p>Project Leaderboard </p>
      <div className="text-sm text-gray-200 pl-4">
        <div className="pt-4">
          <p>1 Notes-App</p>
          <p className="pl-6 text-gray-400">120 commits</p>
        </div>
        <div className="pt-4">
          <p>2 Dashboard-site</p>
          <p className="pl-6 text-gray-400">70 commits</p>
        </div>

        <div className="pt-4">
          <p>3 Graduation-ite</p>
          <p className="pl-6 text-gray-400">10 commits</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectLeaderboard