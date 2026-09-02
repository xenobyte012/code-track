import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const chartConfig = {
  commits: {
    label: "Commits",
    color: "#60a5fa",
  },
};

export default function FrequencyCharts() {
  const [chartData, setChartData] = useState([]);
  const [periodInfo, setPeriodInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const fetchWeeklyCommits = async (date, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const url = `/api/github/weekly-commits?date=${date}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const response = await res.json();

      if (response.error) {
        throw new Error(response.error);
      }

      // Format data for the chart (14 days)
      const formattedData = response.data.map((item) => ({
        date: item.date,
        day: item.day,
        commits: item.commits,
        // Highlight the selected date
        isSelected: item.date === response.period.selected,
      }));

      setChartData(formattedData);
      setPeriodInfo(response.period);
    } catch (error) {
      console.error("Failed to fetch weekly commits:", error);
      setError(error.message);
      // Fallback to empty data
      setChartData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeeklyCommits(selectedDate);
  }, []);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchWeeklyCommits(newDate);
  };

  const handleRefresh = () => {
    fetchWeeklyCommits(selectedDate, true);
  };

  const handlePrevWeek = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    const newDate = date.toISOString().split("T")[0];
    setSelectedDate(newDate);
    fetchWeeklyCommits(newDate);
  };

  const handleNextWeek = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().split("T")[0];
    setSelectedDate(newDate);
    fetchWeeklyCommits(newDate);
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-200">
            Frequency of Commits
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Frequency of Commits
            </CardTitle>
            {periodInfo && (
              <div className="text-xs text-slate-500 mt-1">
                Showing 7 days before & after {periodInfo.selected}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Date Picker */}
            <div className="relative">
              <Input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="bg-slate-900/50 border-slate-700 text-gray-300 text-sm w-40 h-9 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            {/* Day Navigation */}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevWeek}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 px-2"
                title="Previous day"
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextWeek}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 px-2"
                title="Next day"
              >
                →
              </Button>
            </div>

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

        {/* Period Info
        {periodInfo && (
          <div className="text-xs text-slate-500">
            Range: {periodInfo.start} → {periodInfo.end}
          </div>
        )}
           */}
      </CardHeader>

      <CardContent>
        {error && (
          <div className="text-red-400 text-sm text-center mb-4">
            Failed to load data. Click refresh to try again.
          </div>
        )}

        {chartData.length === 0 && !error && (
          <div className="text-slate-400 text-sm text-center mb-4">
            No commits found for this period.
          </div>
        )}

        {chartData.length > 0 && (
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#334155"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                interval={1}
                tickFormatter={(value, index) => {
                  const item = chartData[index];
                  return `${value} ${item.date.split("-")[2]}`;
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent className="bg-slate-800 border border-slate-700 rounded-lg" />
                }
                formatter={(value, name, item) => {
                  const data = item.payload;
                  return [`${value} commits`, `${data.day} ${data.date}`];
                }}
              />
              <Line
                type="monotone"
                dataKey="commits"
                stroke="var(--color-commits)"
                strokeWidth={3}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  const isSelected = payload.isSelected;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 8 : 4}
                      fill={isSelected ? "#60a5fa" : "var(--color-commits)"}
                      stroke={isSelected ? "#3b82f6" : "none"}
                      strokeWidth={2}
                      className="transition-all duration-200"
                    />
                  );
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
