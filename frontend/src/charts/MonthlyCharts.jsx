import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", hours: 30 },
  { month: "Feb", hours: 45 },
  { month: "Mar", hours: 38 },
  // ... more months
];

const chartConfig = {
  hours: {
    label: "Hours",
    color: "#a78bfa", // purple-400
  },
};

export default function MonthlyChart() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-200">
          Monthly Coding Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="bg-slate-800 border-slate-700" />
              }
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="var(--color-hours)"
              strokeWidth={3}
              dot={{ fill: "var(--color-hours)", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
