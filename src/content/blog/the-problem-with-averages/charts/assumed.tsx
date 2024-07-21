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
  { interval: 1, value: 3.5 },
  { interval: 2, value: 4.5 },
  { interval: 3, value: 3.8 },
  { interval: 4, value: 4.2 },
];

const Chart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 50 }}
      >
        <ReferenceLine
          y={4}
          label="Average"
          stroke="red"
          strokeDasharray="3 3"
        />
        <YAxis dataKey="value" />
        <XAxis dataKey="interval" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
