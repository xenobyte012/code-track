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

const hoursData = [
  { hour: "00", hours: 0 },
  { hour: "01", hours: 0 },
  { hour: "02", hours: 0 },
  { hour: "03", hours: 0 },
  { hour: "04", hours: 0 },
  { hour: "05", hours: 1 },
  { hour: "06", hours: 2 },
  { hour: "07", hours: 1 },
  { hour: "08", hours: 0 },
  { hour: "09", hours: 0 },
  { hour: "10", hours: 1 },
  { hour: "11", hours: 2 },
  { hour: "12", hours: 1 },
  { hour: "13", hours: 0 },
  { hour: "14", hours: 0 },
  { hour: "15", hours: 1 },
  { hour: "16", hours: 2 },
  { hour: "17", hours: 3 },
  { hour: "18", hours: 4 },
  { hour: "19", hours: 5 },
  { hour: "20", hours: 7 },
  { hour: "21", hours: 6 },
  { hour: "22", hours: 5 },
  { hour: "23", hours: 2 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

export default function PeakCodingHours() {
  return (
    <Card className="border border-slate-950 ">
      <CardHeader>
        <CardTitle>Peak Coding Hours</CardTitle>
      </CardHeader>

      <CardContent className="">
        <ChartContainer config={chartConfig} className="h-50 w-full ">
          <BarChart data={hoursData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              interval={1}
              
            />
            <YAxis
              dataKey="hours"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar dataKey="hours" fill="var(--color-desktop)" radius={4}>
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
