import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GithubHeatmap() {
  const values = [
    { date: "2026-05-01", count: 1 },
    { date: "2026-05-02", count: 4 },
    { date: "2026-05-03", count: 2 },
    { date: "2026-05-04", count: 8 },
    { date: "2026-05-05", count: 6 },
    { date: "2026-05-06", count: 10 },
    { date: "2026-05-07", count: 1 },
    { date: "2026-05-08", count: 4 },
    { date: "2026-05-09", count: 2 },
    { date: "2026-05-10", count: 8 },
    { date: "2026-05-11", count: 6 },
    { date: "2026-05-12", count: 10 },
    { date: "2026-05-13", count: 1 },
    { date: "2026-05-14", count: 4 },
    { date: "2026-05-15", count: 2 },
    { date: "2026-05-16", count: 8 },
    { date: "2026-05-17", count: 6 },
    { date: "2026-05-18", count: 10 },
  ];

  return (
    <Card className="w-full h-60 border border-slate-950">
      <CardHeader>
        <CardTitle>Coding Commits</CardTitle>
      </CardHeader>

      <CardContent>
        <CalendarHeatmap
          className="rounded-xl"
          startDate={new Date("2026-01-01")}
          endDate={new Date("2026-12-31")}
          values={values}
          classForValue={(value) => {
            if (!value) return "color-empty";

            if (value.count >= 8) return "color-github-4";
            if (value.count >= 5) return "color-github-3";
            if (value.count >= 3) return "color-github-2";
            return "color-github-1";
          }}
        />
      </CardContent>
    </Card>
  );
}
