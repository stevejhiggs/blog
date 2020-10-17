import React from "react";
import {
  LineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { interval: 1, value: 1 },
  { interval: 2, value: 2 },
  { interval: 3, value: 12 },
  { interval: 4, value: 1 },
];

const Chart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 50 }}
      >
        <ReferenceLine
          y={12}
          label="Max"
          stroke="green"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={4}
          label="Average"
          stroke="red"
          strokeDasharray="3 3"
        />
        <ReferenceLine y={1} label="Min" stroke="blue" strokeDasharray="3 3" />
        <YAxis dataKey="value" />
        <XAxis dataKey="interval" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
