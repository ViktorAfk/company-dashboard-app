import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

import { Price } from '@/api/types';
import { type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'blue',
  },
} satisfies ChartConfig;

type Props = {
  prices: Price[];
};
export const CompanyChart: React.FC<Props> = ({ prices }) => {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px]">
      <BarChart accessibilityLayer data={prices}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="price" minPointSize={20} fill="blue" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};
