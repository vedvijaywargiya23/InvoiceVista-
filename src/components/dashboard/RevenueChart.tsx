import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RevenueChartProps {
  data?: {
    name: string;
    revenue: number;
    expenses: number;
  }[];
  title?: string;
  subtitle?: string;
  onDataUpdate?: (data: any[]) => void;
}

type Currency = {
  symbol: string;
  code: string;
  name: string;
  rate: number; // Exchange rate relative to INR (1 INR = rate of other currency)
};

const currencies: Currency[] = [
  { symbol: "₹", code: "INR", name: "Indian Rupee", rate: 1 },
  { symbol: "$", code: "USD", name: "US Dollar", rate: 0.012 },
  { symbol: "€", code: "EUR", name: "Euro", rate: 0.011 },
  { symbol: "£", code: "GBP", name: "British Pound", rate: 0.0095 },
];

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
  onDataUpdate,
}: RevenueChartProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0],
  ); // Default to INR
  const [convertedData, setConvertedData] = useState(data);

  // Convert data based on selected currency
  useEffect(() => {
    const newData = data.map((item) => ({
      ...item,
      revenue: Number((item.revenue * selectedCurrency.rate).toFixed(2)),
      expenses: Number((item.expenses * selectedCurrency.rate).toFixed(2)),
    }));
    setConvertedData(newData);

    // If onDataUpdate callback exists, call it with the new data
    if (onDataUpdate) {
      onDataUpdate(newData);
    }
  }, [data, selectedCurrency, onDataUpdate]);

  const handleCurrencyChange = (value: string) => {
    const currency = currencies.find((c) => c.code === value) || currencies[0];
    setSelectedCurrency(currency);
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="w-40">
          <Select
            value={selectedCurrency.code}
            onValueChange={handleCurrencyChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={convertedData}
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
                tickFormatter={(value) => `${selectedCurrency.symbol}${value}`}
              />
              <Tooltip
                formatter={(value) => [
                  `${selectedCurrency.symbol}${value}`,
                  undefined,
                ]}
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
