import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pie, PieChart } from "recharts";

const chartData = [
  { language: "JavaScript", percentage: 60, fill: "#facc15" },
  { language: "React", percentage: 20, fill: "#60a5fa" },
  { language: "CSS", percentage: 15, fill: "#a78bfa" },
  { language: "HTML", percentage: 5, fill: "#f472b6" },
];

const chartConfig = {
  JavaScript: { label: "JavaScript", color: "#facc15" },
  React: { label: "React", color: "#60a5fa" },
  CSS: { label: "CSS", color: "#a78bfa" },
  HTML: { label: "HTML", color: "#f472b6" },
};

const projects = [
  { label: "Notes App", value: "notes" },
  { label: "Website Shop", value: "website-shop" },
  { label: "Code Tracker", value: "code-track" },
];

export default function LanguageDistribution() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-200">
          Language Distribution
        </CardTitle>
        <Select>
          <SelectTrigger className="w-40 bg-slate-900/50 border-slate-700 text-gray-300 text-sm">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-gray-300">
            <SelectGroup>
              <SelectLabel className="text-slate-500">Projects</SelectLabel>
              {projects.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent className="bg-slate-800 border border-slate-700 rounded-lg" />
              }
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={40}
              paddingAngle={2}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="language" />}
              className="flex-wrap gap-3 justify-center pt-4 text-sm text-gray-300"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
