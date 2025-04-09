import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  IndianRupee,
} from "lucide-react";

interface FinancialSummaryProps {
  totalRevenue?: number;
  outstandingPayments?: number;
  monthlyEarnings?: number;
  pendingInvoices?: number;
  currencySymbol?: string;
  onUpdate?: (data: any) => void;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalRevenue = 24500,
  outstandingPayments = 4320,
  monthlyEarnings = 8750,
  pendingInvoices = 5,
  currencySymbol = "₹",
  onUpdate,
}) => {
  const [stats, setStats] = useState({
    totalRevenue,
    outstandingPayments,
    monthlyEarnings,
    pendingInvoices,
  });

  // Update stats when props change
  useEffect(() => {
    setStats({
      totalRevenue,
      outstandingPayments,
      monthlyEarnings,
      pendingInvoices,
    });

    // If onUpdate callback exists, call it with the current stats
    if (onUpdate) {
      onUpdate({
        totalRevenue,
        outstandingPayments,
        monthlyEarnings,
        pendingInvoices,
      });
    }
  }, [
    totalRevenue,
    outstandingPayments,
    monthlyEarnings,
    pendingInvoices,
    onUpdate,
  ]);

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Financial Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue Card */}
        <Card className="bg-white border-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {currencySymbol}
              {stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpCircle className="h-3 w-3 mr-1" /> 12% from last month
            </p>
          </CardContent>
        </Card>

        {/* Outstanding Payments Card */}
        <Card className="bg-white border-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Outstanding Payments
            </CardTitle>
            <ArrowDownCircle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {currencySymbol}
              {stats.outstandingPayments.toLocaleString()}
            </div>
            <p className="text-xs text-amber-600 flex items-center mt-1">
              <ArrowDownCircle className="h-3 w-3 mr-1" />{" "}
              {stats.pendingInvoices} invoices pending
            </p>
          </CardContent>
        </Card>

        {/* Monthly Earnings Card */}
        <Card className="bg-white border-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Monthly Earnings
            </CardTitle>
            <Calendar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {currencySymbol}
              {stats.monthlyEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpCircle className="h-3 w-3 mr-1" /> 8% from previous month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialSummary;
