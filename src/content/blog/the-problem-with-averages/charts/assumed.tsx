import React from "react";
import {
  LineChart,
  XAxis,
  Line,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", val: 3.5 },
  { month: "February", val: 4.5 },
  { month: "March", val: 3.8 },
  { month: "April", val: 4.2 },
];

const chartConfig = {
  val: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart: React.FC = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ReferenceLine
          y={4}
          label="Average"
          stroke="hsl(var(--chart-4))"
          strokeDasharray="3 3"
        />
        <YAxis dataKey="val" />
        <XAxis dataKey="month" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          type="monotone"
          dataKey="val"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default Chart;
