import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

const chartData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 7 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 2 },
  { day: "Fri", hours: 6 },
  { day: "Sat", hours: 8 },
  { day: "Sun", hours: 9 },
];

const chartConfig = {
  hours: {
    label: "Hours",
    color: "#60a5fa", // blue-400
  },
};

export default function WeekHoursCharts() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-200">
          Weekly Coding Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
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
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="bg-slate-800 border border-slate-700 rounded-lg" />
              }
            />
            <Bar
              dataKey="hours"
              fill="var(--color-hours)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="hours"
                position="top"
                offset={5}
                className="fill-gray-400 text-xs"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
