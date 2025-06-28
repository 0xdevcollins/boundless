'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { activityData } from '@/data/mock-data';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomTooltip from './custom-tooltip';
import RecentActivity from './recent-activity';

const CustomDot = (props: { cx?: number; cy?: number }) => {
  const { cx = 0, cy = 0 } = props;
  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M8.39453 1.69336C12.3496 1.69336 15.5615 4.91388 15.5615 8.89453C15.5615 12.8752 12.3496 16.0957 8.39453 16.0957C4.43945 16.0957 1.22754 12.8752 1.22754 8.89453C1.22754 4.91388 4.43945 1.69336 8.39453 1.69336Z"
        fill="#8CDDE6"
        stroke="white"
        strokeWidth="1.66528"
      />
    </svg>
  );
};

export default function ActivityOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-7 mb-6">
      <Card className="md:col-span-5">
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[250px] sm:h-[300px]">
            {/* <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                  width={50}
                  tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  name="Contributions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorContributions)"
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="participants"
                  name="Participants"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorParticipants)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                {/* <CartesianGrid vertical={false} stroke="#333" strokeDasharray="6 6" /> */}
				
				<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />

                {/* <XAxis dataKey="time" stroke="#A3A3A3" tickLine={false} strokeWidth={0} tick={{ fontSize: 12 }} /> */}
				<YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                  width={50}
                  tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
                />
                {/* <YAxis
                  tickLine={false}
                  strokeWidth={0}
                  stroke="#A3A3A3"
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                  tick={{ fontSize: 12 }}
                /> */}
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8CDDE6', strokeDasharray: '3 3' }} />
				<Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
                <Line
                  type="bumpX"
                  dataKey="contributions"
                  name="Contributions"
                  stroke="#8CDDE6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={<CustomDot />}
                />
                <Line
                  type="bumpX"
                  dataKey="participants"
                  name="Participants"
                  stroke="#FFC571"
                  strokeWidth={2}
                  dot={false}
                  activeDot={<CustomDot />}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
}
