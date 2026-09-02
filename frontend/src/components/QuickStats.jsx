import React, { useEffect, useState } from "react";
import { FolderGit2, GitCommit, Clock, Flame } from "lucide-react";

const demoData = [
  {
    id: 1,
    name: "Total Repositories",
    stateKey: "totalRepos",
    icon: FolderGit2,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Total Contributions",
    stateKey: "totalContribution",
    icon: GitCommit,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    name: "Total Hours",
    stateKey: "totalHours", // FIXED: was "statekey"
    icon: Clock,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: 4,
    name: "Current Streak",
    stateKey: "streak", // FIXED: was hardcoded value
    icon: Flame,
    color: "from-orange-500 to-red-600",
  },
];

function QuickStats() {
  const [totalRepos, setTotalRepos] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingContribution, setLoadingContribution] = useState(false);
  const [loadingStreak, setLoadingStreak] = useState(false); // ADDED

  const fetchStreak = async () => {
    setLoadingStreak(true);
    try {
      const res = await fetch(`/api/github/streak`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned HTML. Check API URL.`);
      }
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      if (data.currentStreak) setStreak(data.currentStreak); // FIXED: was streak(...)
    } catch (error) {
      console.error("Failed to fetch streak:", error);
    } finally {
      setLoadingStreak(false);
    }
  };

  const overViewTotalRepo = async () => {
    setLoadingRepos(true);
    try {
      const res = await fetch(`/api/github/totalrepos`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned HTML. Check API URL.`);
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      if (data.count) setTotalRepos(data.count);
    } catch (error) {
      console.error("Failed to fetch repos:", error);
    } finally {
      setLoadingRepos(false);
    }
  };

  const overViewTotalContribution = async () => {
    setLoadingContribution(true);
    try {
      const res = await fetch(`/api/github/totalcontribution`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned HTML. Check API URL.`);
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      if (data.totalCommits) setTotalContribution(data.totalCommits);
    } catch (error) {
      console.error("Failed to fetch contribution:", error);
    } finally {
      setLoadingContribution(false);
    }
  };

  useEffect(() => {
    overViewTotalRepo();
    overViewTotalContribution();
    fetchStreak();
  }, []);

  const getValue = (item) => {
    if (item.stateKey === "totalRepos") {
      return loadingRepos ? "..." : totalRepos;
    }
    if (item.stateKey === "totalContribution") {
      return loadingContribution ? "..." : totalContribution;
    }
    if (item.stateKey === "totalHours") {
      return "50h"; // Static for now — replace with API call if needed
    }
    if (item.stateKey === "streak") {
      return loadingStreak ? "..." : `${streak} Days`;
    }
    return item.value;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {demoData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-slate-700/10 to-transparent"></div>

            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 mb-4 shadow-lg`}
            >
              <Icon className="w-full h-full text-white" />
            </div>

            <div>
              <p className="text-sm text-gray-400 font-medium">{item.name}</p>
              <p className="text-3xl font-bold mt-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {getValue(item)}
              </p>
            </div>

            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors duration-300"></div>
          </div>
        );
      })}
    </div>
  );
}

export default QuickStats;
