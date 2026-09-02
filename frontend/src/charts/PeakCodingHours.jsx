import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

const hoursData = [
  { hour: "00", hours: 0 },
  { hour: "01", hours: 0 },
  // ... full data
  { hour: "23", hours: 2 },
];

const chartConfig = {
  hours: {
    label: "Hours",
    color: "#a78bfa", // purple-400
  },
};

export default function PeakCodingHours() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-200">
          Peak Coding Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart
            data={hoursData}
            margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#334155"
            />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              interval={2}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
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
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
