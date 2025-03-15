import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

export default function DashboardStats() {
  // Mock data - would come from your backend in a real app
  const stats = [
    {
      title: "Total Revenue",
      value: "$0.00",
      description: "Year to date",
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      change: "0%",
      trend: "neutral",
    },
    {
      title: "Outstanding Payments",
      value: "$0.00",
      description: "No invoices yet",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      change: "0%",
      trend: "neutral",
    },
    {
      title: "Monthly Earnings",
      value: "$0.00",
      description: "This month",
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      change: "0%",
      trend: "neutral",
    },
    {
      title: "Yearly Growth",
      value: "0%",
      description: "Compared to last year",
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      change: "0%",
      trend: "neutral",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
            <div
              className={`text-xs mt-2 flex items-center ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"}`}
            >
              {stat.change}
              <span className="ml-1">
                {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "―"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
