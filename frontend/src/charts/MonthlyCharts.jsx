import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },

];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

export default function MonthlyCharts() {
  return (
    <Card className="border border-slate-950 ">
      <CardHeader>
        <CardTitle>Monthly Coding Hours</CardTitle>
      </CardHeader>

      <CardContent className="">
        <ChartContainer config={chartConfig} className="h-50 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
              <LabelList
                position="top"
                offset={5}
                className="fill-popover"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
