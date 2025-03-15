import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data?: {
    name: string;
    revenue: number;
    expenses: number;
  }[];
  title?: string;
  subtitle?: string;
}

const RevenueChart = ({
  data = [
    { name: "Jan", revenue: 0, expenses: 0 },
    { name: "Feb", revenue: 0, expenses: 0 },
    { name: "Mar", revenue: 0, expenses: 0 },
    { name: "Apr", revenue: 0, expenses: 0 },
    { name: "May", revenue: 0, expenses: 0 },
    { name: "Jun", revenue: 0, expenses: 0 },
    { name: "Jul", revenue: 0, expenses: 0 },
    { name: "Aug", revenue: 0, expenses: 0 },
    { name: "Sep", revenue: 0, expenses: 0 },
    { name: "Oct", revenue: 0, expenses: 0 },
    { name: "Nov", revenue: 0, expenses: 0 },
    { name: "Dec", revenue: 0, expenses: 0 },
  ],
  title = "Revenue Overview",
  subtitle = "Monthly revenue and expenses for the current year",
}: RevenueChartProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="#93c5fd"
                fillOpacity={0.3}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fill="#fca5a5"
                fillOpacity={0.3}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
