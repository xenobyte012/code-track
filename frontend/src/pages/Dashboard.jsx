import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FrequencyCharts from "../charts/frequencyCharts";
import HeatMap from "../charts/HeatMap"
import MonthlyChart from "../charts/MonthlyCharts";
import WeekHoursCharts from "../charts/WeekHoursCharts";
import PeakCodingHours from "../charts/PeakCodingHours";
import ProjectLeaderboard from "../charts/ProjectLeaderboard";
import ActiveProjects from "../charts/ActiveProjects";
import LanguageDistribution from "@/charts/LanguageDistribution";
import QuickStats from "@/components/QuickStats";
function Dashboard() {



  return (
    <div className="bg-slate-800 h-full flex text-gray-200 ml-70 ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        <div className="mt-12 p-8">
          <QuickStats />
          <div className=" mt-12 grid grid-col h-auto grid-cols-[2fr_1fr] gap-8">
            <div>
              <HeatMap />
            </div>
            <div>
              <FrequencyCharts />
            </div>
          </div>
          <div className=" mt-12 grid grid-col h-auto grid-cols-[1fr_2fr] gap-12">
            <div>
              <MonthlyChart />
            </div>
            <div>
              <WeekHoursCharts />
            </div>
          </div>
          <div className=" mt-12 grid grid-col h-auto grid-cols-2 gap-12">
            <div>
              <PeakCodingHours />
            </div>
            <div>
              <ProjectLeaderboard />
            </div>
          </div>
          <div className=" mt-12 grid grid-col h-auto grid-cols-[1fr_2fr] gap-12">

            <div>
              <ActiveProjects />
            </div>
            <div><LanguageDistribution /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
