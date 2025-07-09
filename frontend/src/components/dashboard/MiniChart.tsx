import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, isPositive }) => {
  const chartData = data.map((value, index) => ({
    index,
    value
  }));

  return (
    <div className="w-24 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;