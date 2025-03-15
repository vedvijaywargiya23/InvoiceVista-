import React from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">
              Welcome back to your invoice management dashboard
            </p>
          </div>

          <div className="space-y-6">
            {/* Financial Summary Section */}
            <FinancialSummary
              totalRevenue={24500}
              outstandingPayments={4320}
              monthlyEarnings={8750}
            />

            {/* Charts and Recent Invoices Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RevenueChart
                  title="Revenue Overview"
                  subtitle="Monthly revenue and expenses for the current year"
                  data={[
                    { name: "Jan", revenue: 4000, expenses: 2400 },
                    { name: "Feb", revenue: 3000, expenses: 1398 },
                    { name: "Mar", revenue: 2000, expenses: 9800 },
                    { name: "Apr", revenue: 2780, expenses: 3908 },
                    { name: "May", revenue: 1890, expenses: 4800 },
                    { name: "Jun", revenue: 2390, expenses: 3800 },
                    { name: "Jul", revenue: 3490, expenses: 4300 },
                    { name: "Aug", revenue: 4000, expenses: 2400 },
                    { name: "Sep", revenue: 3000, expenses: 1398 },
                    { name: "Oct", revenue: 2000, expenses: 9800 },
                    { name: "Nov", revenue: 2780, expenses: 3908 },
                    { name: "Dec", revenue: 1890, expenses: 4800 },
                  ]}
                />
              </div>
              <div>
                <RecentInvoices
                  title="Recent Invoices"
                  invoices={[
                    {
                      id: "INV-001",
                      client: "Acme Corp",
                      amount: 1250.0,
                      date: "2023-05-15",
                      status: "paid",
                    },
                    {
                      id: "INV-002",
                      client: "Globex Inc",
                      amount: 3450.75,
                      date: "2023-05-20",
                      status: "pending",
                    },
                    {
                      id: "INV-003",
                      client: "Stark Industries",
                      amount: 5000.0,
                      date: "2023-05-10",
                      status: "overdue",
                    },
                    {
                      id: "INV-004",
                      client: "Wayne Enterprises",
                      amount: 2750.5,
                      date: "2023-05-25",
                      status: "paid",
                    },
                    {
                      id: "INV-005",
                      client: "Umbrella Corp",
                      amount: 1800.25,
                      date: "2023-05-18",
                      status: "pending",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                  <span className="font-medium text-blue-700">
                    Create New Invoice
                  </span>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                  <span className="font-medium text-green-700">
                    Add New Client
                  </span>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors">
                  <span className="font-medium text-purple-700">
                    View Reports
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
