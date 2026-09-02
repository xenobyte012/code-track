import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FrequencyCharts from "../charts/frequencyCharts";
import HeatMap from "../charts/HeatMap";
import MonthlyChart from "../charts/MonthlyCharts";
import WeekHoursCharts from "../charts/WeekHoursCharts";
import PeakCodingHours from "../charts/PeakCodingHours";
import ProjectLeaderboard from "../charts/ProjectLeaderboard";
import ActiveProjects from "../charts/ActiveProjects";
import LanguageDistribution from "@/charts/LanguageDistribution";
import QuickStats from "@/components/QuickStats";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex text-gray-200">
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar />
      </div>

      <div className="flex-1 ml-72">
        <Navbar />

        <main className="mt-20 p-6 lg:p-8">
          {/* Quick Stats Section */}
          <section className="mb-8">
            <QuickStats />
          </section>

          {/* Charts Grid */}
          <div className="space-y-8">
            {/* Row 1: HeatMap + Frequency */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <HeatMap />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <FrequencyCharts />
              </div>
            </div>

            {/* Row 2: Monthly + Week Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <MonthlyChart />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <WeekHoursCharts />
              </div>
            </div>

            {/* Row 3: Peak Hours + Project Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <PeakCodingHours />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <ProjectLeaderboard />
              </div>
            </div>

            {/* Row 4: Active Projects + Language Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <ActiveProjects />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <LanguageDistribution />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
