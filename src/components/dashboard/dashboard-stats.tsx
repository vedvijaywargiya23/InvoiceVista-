import { Card, CardContent } from "../ui/card";
import {
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle,
  CreditCard,
  TrendingUp,
} from "lucide-react";

interface DashboardStatsProps {
  totalInvoices?: number;
  paidInvoices?: number;
  unpaidInvoices?: number;
}

export default function DashboardStats({
  totalInvoices = 0,
  paidInvoices = 0,
  unpaidInvoices = 0,
}: DashboardStatsProps) {
  // Original stats from the existing component
  const financialStats = [
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

  // New invoice stats
  const invoiceStats = [
    {
      title: "Total Invoices",
      value: totalInvoices.toString(),
      description: "All invoices created",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.toString(),
      description: "Completed payments",
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Unpaid Invoices",
      value: unpaidInvoices.toString(),
      description: "Pending payments",
      icon: <AlertCircle className="h-6 w-6 text-amber-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {invoiceStats.map((stat, index) => (
          <Card
            key={`invoice-${index}`}
            className="bg-white hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">{stat.icon}</div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((stat, index) => (
          <Card key={`financial-${index}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between pb-2">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              <div
                className={`text-xs mt-2 flex items-center ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"}`}
              >
                {stat.change}
                <span className="ml-1">
                  {stat.trend === "up"
                    ? "↑"
                    : stat.trend === "down"
                      ? "↓"
                      : "―"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
