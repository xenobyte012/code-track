import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis , YAxis} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Mon", desktop: 186 },
  { month: "Tue", desktop: 305 },
  { month: "Wen", desktop: 237 },
  { month: "Thu", desktop: 73 },
  { month: "Fri", desktop: 209 },
  { month: "Sat", desktop: 4 },
  { month: "Sun", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};
export default function FrequencyCharts() {
  return (
    <Card className="border border-slate-950 w-full ">
      <CardHeader>
        <CardTitle>Frequency Commit</CardTitle>
      </CardHeader>

      <CardContent className="h-">
        <ChartContainer config={chartConfig} className="h-43 w-full=  ">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />

            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="desktop"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={4}
            ></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
