import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader2, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GithubHeatmap() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalCommits, setTotalCommits] = useState(0);

  const fetchHeatmapData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const url = `/api/github/heatmap?year=${year}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Format data for the heatmap
      // Expected format: [{ date: "2026-05-01", count: 5 }, ...]
      const formattedData = data.data.map((item) => ({
        date: item.date,
        count: item.count || item.commits || 0,
      }));

      setValues(formattedData);
      setTotalCommits(data.totalCommits || 0);
    } catch (error) {
      console.error("Failed to fetch heatmap data:", error);
      setError(error.message);
      // Fallback to empty data
      setValues([]);
      setTotalCommits(0);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHeatmapData();
  }, [year]);

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  const handleRefresh = () => {
    fetchHeatmapData(true);
  };

  // Generate year options (current year and 5 years back)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let y = currentYear; y >= currentYear - 5; y--) {
    yearOptions.push(y);
  }

  if (loading) {
    return (
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-200">
            Coding Commits
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Coding Commits
            </CardTitle>
            {totalCommits > 0 && (
              <p className="text-xs text-slate-400 mt-1">
                {totalCommits.toLocaleString()} commits in {year}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Year Selector */}
            <select
              value={year}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="bg-slate-900/50 border border-slate-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y} className="bg-slate-900">
                  {y}
                </option>
              ))}
            </select>

            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pb-4">
        {/* Custom styles for the heatmap */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .react-calendar-heatmap .color-empty { fill: #1e293b; }
              .react-calendar-heatmap .color-github-1 { fill: #0e4429; }
              .react-calendar-heatmap .color-github-2 { fill: #006d32; }
              .react-calendar-heatmap .color-github-3 { fill: #26a641; }
              .react-calendar-heatmap .color-github-4 { fill: #39d353; }
              .react-calendar-heatmap rect { 
                rx: 2; 
                transition: all 0.2s ease;
              }
              .react-calendar-heatmap rect:hover {
                stroke: #60a5fa;
                stroke-width: 2px;
              }
              .react-calendar-heatmap .heatmap-label {
                fill: #64748b;
                font-size: 10px;
                font-weight: 500;
              }
            `,
          }}
        />

        {error && (
          <div className="text-red-400 text-sm text-center px-4 py-2 mb-2">
            {error}
          </div>
        )}

        {values.length === 0 && !error && (
          <div className="text-slate-400 text-sm text-center px-4 py-8">
            No commit data available for {year}
          </div>
        )}

        {values.length > 0 && (
          <div className="px-4">
            <CalendarHeatmap
              startDate={new Date(`${year}-01-01`)}
              endDate={new Date(`${year}-12-31`)}
              values={values}
              classForValue={(value) => {
                if (!value || !value.count) return "color-empty";
                if (value.count >= 8) return "color-github-4";
                if (value.count >= 5) return "color-github-3";
                if (value.count >= 3) return "color-github-2";
                return "color-github-1";
              }}
              titleForValue={(value) => {
                if (!value || !value.date) return "No commits";
                return `${value.date}: ${value.count || 0} commits`;
              }}
            />
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 px-6 mt-2">
          <span className="text-xs text-slate-500">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-[#0e4429]"></div>
            <div className="w-3 h-3 rounded bg-[#006d32]"></div>
            <div className="w-3 h-3 rounded bg-[#26a641]"></div>
            <div className="w-3 h-3 rounded bg-[#39d353]"></div>
          </div>
          <span className="text-xs text-slate-500">More</span>
        </div>
      </CardContent>
    </Card>
  );
}
