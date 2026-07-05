import React from 'react'

function ActiveProjects() {
  return (
    <div className="bg-slate-900 border border-slate-950 rounded-xl w-full h-full p-4">
      <p>Active projects this week </p>
      <div className="text-sm text-gray-200 pl-4">
        <div className="pt-4">
          <p>Notes-App</p>
          <p className="pl-6 text-gray-400">10 Hours</p>
        </div>
        <div className="pt-4">
          <p>2 Dashboard-site</p>
          <p className="pl-6 text-gray-400">15 Hours</p>
        </div>

        <div className="pt-4">
          <p>3 Graduation-site</p>
          <p className="pl-6 text-gray-400">65 Hours</p>
        </div>
      </div>
    </div>
  );
}

export default ActiveProjects