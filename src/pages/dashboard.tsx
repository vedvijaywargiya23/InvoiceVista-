import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import DashboardStats from "../components/dashboard/dashboard-stats";

const Dashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    // Invoice stats
    totalInvoices: 42,
    paidInvoices: 28,
    unpaidInvoices: 14,

    // Financial stats
    totalRevenue: 24500,
    outstandingPayments: 4320,
    monthlyEarnings: 8750,
    yearlyGrowth: 12,

    // Chart data
    revenueData: [
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
    ],

    // Recent invoices
    recentInvoices: [
      {
        id: "INV-001",
        client: "Acme Corp",
        amount: 1250.0,
        date: "2023-05-15",
        status: "paid" as "paid",
      },
      {
        id: "INV-002",
        client: "Globex Inc",
        amount: 3450.75,
        date: "2023-05-20",
        status: "pending" as "pending",
      },
      {
        id: "INV-003",
        client: "Stark Industries",
        amount: 5000.0,
        date: "2023-05-10",
        status: "overdue" as "overdue",
      },
      {
        id: "INV-004",
        client: "Wayne Enterprises",
        amount: 2750.5,
        date: "2023-05-25",
        status: "paid" as "paid",
      },
      {
        id: "INV-005",
        client: "Umbrella Corp",
        amount: 1800.25,
        date: "2023-05-18",
        status: "pending" as "pending",
      },
    ],

    // Currency settings
    currencySymbol: "₹",
  });

  // Load real invoice data from localStorage
  useEffect(() => {
    const loadInvoiceData = () => {
      try {
        const savedInvoices = JSON.parse(
          localStorage.getItem("invoices") || "[]",
        );
        if (savedInvoices.length > 0) {
          // Calculate stats
          const totalInvoices = savedInvoices.length;
          const paidInvoices = savedInvoices.filter(
            (inv) => inv.status.toLowerCase() === "paid",
          ).length;
          const unpaidInvoices = totalInvoices - paidInvoices;

          // Calculate financial data
          let totalRevenue = 0;
          let outstandingPayments = 0;
          let monthlyEarnings = 0;

          // Get current month and year
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          savedInvoices.forEach((invoice) => {
            // Extract numeric amount from string (remove currency symbol)
            const amountStr = invoice.amount.toString().replace(/[^0-9.]/g, "");
            const amount = parseFloat(amountStr) || 0;

            if (invoice.status.toLowerCase() === "paid") {
              totalRevenue += amount;

              // Check if invoice was paid in current month
              const invoiceDate = new Date(invoice.date);
              if (
                invoiceDate.getMonth() === currentMonth &&
                invoiceDate.getFullYear() === currentYear
              ) {
                monthlyEarnings += amount;
              }
            } else {
              outstandingPayments += amount;
            }
          });

          // Format recent invoices
          const recentInvoices = savedInvoices.slice(0, 5).map((invoice) => ({
            id: invoice.id,
            client: invoice.client,
            amount:
              parseFloat(invoice.amount.toString().replace(/[^0-9.]/g, "")) ||
              0,
            date: invoice.date,
            status: invoice.status.toLowerCase() as
              | "paid"
              | "pending"
              | "overdue",
          }));

          // Update dashboard data
          setDashboardData((prev) => ({
            ...prev,
            totalInvoices,
            paidInvoices,
            unpaidInvoices,
            totalRevenue,
            outstandingPayments,
            monthlyEarnings,
            recentInvoices,
            // Keep yearly growth as is or calculate it based on historical data
          }));
        }
      } catch (error) {
        console.error("Error loading invoice data:", error);
      }
    };

    // Load data initially
    loadInvoiceData();

    // Set up event listeners for real-time updates
    const handleInvoiceUpdate = () => {
      loadInvoiceData();
    };

    window.addEventListener("invoiceUpdated", handleInvoiceUpdate);

    // Clean up event listener
    return () => {
      window.removeEventListener("invoiceUpdated", handleInvoiceUpdate);
    };
  }, []);

  // Handle creating a new invoice
  const handleCreateInvoice = () => {
    // Simulate creating a new invoice
    const newInvoiceId = `INV-00${dashboardData.totalInvoices + 1}`;
    const invoiceAmount = 2500.0;
    const newInvoice = {
      id: newInvoiceId,
      client: "New Client",
      amount: invoiceAmount,
      date: new Date().toISOString().split("T")[0],
      status: "pending" as "pending",
    };

    // Update dashboard data
    setDashboardData((prev) => ({
      ...prev,
      totalInvoices: prev.totalInvoices + 1,
      unpaidInvoices: prev.unpaidInvoices + 1,
      outstandingPayments: prev.outstandingPayments + invoiceAmount,
      monthlyEarnings: prev.monthlyEarnings, // Monthly earnings don't change until paid
      recentInvoices: [newInvoice, ...prev.recentInvoices.slice(0, 4)],
    }));
  };

  // Handle marking an invoice as paid
  const handleMarkAsPaid = () => {
    // Only proceed if there are unpaid invoices
    if (dashboardData.unpaidInvoices > 0) {
      // Find the first pending invoice
      const pendingInvoiceIndex = dashboardData.recentInvoices.findIndex(
        (invoice) =>
          invoice.status === "pending" || invoice.status === "overdue",
      );

      if (pendingInvoiceIndex >= 0) {
        const updatedInvoices = [...dashboardData.recentInvoices];
        const invoiceAmount = updatedInvoices[pendingInvoiceIndex].amount;
        updatedInvoices[pendingInvoiceIndex] = {
          ...updatedInvoices[pendingInvoiceIndex],
          status: "paid" as "paid",
        };

        // Calculate new yearly growth (simulate 0.5% growth per invoice paid)
        const newYearlyGrowth = dashboardData.yearlyGrowth + 0.5;

        // Update dashboard data
        setDashboardData((prev) => ({
          ...prev,
          paidInvoices: prev.paidInvoices + 1,
          unpaidInvoices: prev.unpaidInvoices - 1,
          outstandingPayments: Math.max(
            0,
            prev.outstandingPayments - invoiceAmount,
          ),
          totalRevenue: prev.totalRevenue + invoiceAmount,
          monthlyEarnings: prev.monthlyEarnings + invoiceAmount,
          yearlyGrowth: newYearlyGrowth,
          recentInvoices: updatedInvoices,
        }));
      }
    }
  };

  // Handle adding a new client
  const handleAddClient = () => {
    // This would typically open a dialog to add a client
    // For now, we'll just update some stats to show the dynamic nature
    setDashboardData((prev) => ({
      ...prev,
      yearlyGrowth: prev.yearlyGrowth + 1,
    }));
  };

  // Handle currency data updates from RevenueChart
  const handleChartDataUpdate = (newData: any[]) => {
    // This would be called when the currency changes in the RevenueChart
    // We don't need to update the original data, just acknowledge the change
    console.log("Chart data updated with new currency", newData);
  };

  // Function to mark an invoice as overdue
  const handleMarkAsOverdue = () => {
    // Find the first pending invoice
    const pendingInvoiceIndex = dashboardData.recentInvoices.findIndex(
      (invoice) => invoice.status === "pending",
    );

    if (pendingInvoiceIndex >= 0) {
      const updatedInvoices = [...dashboardData.recentInvoices];
      updatedInvoices[pendingInvoiceIndex] = {
        ...updatedInvoices[pendingInvoiceIndex],
        status: "overdue" as "overdue",
      };

      // Update dashboard data
      setDashboardData((prev) => ({
        ...prev,
        recentInvoices: updatedInvoices,
      }));
    }
  };

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
            {/* Invoice Stats Section */}
            <DashboardStats
              totalInvoices={dashboardData.totalInvoices}
              paidInvoices={dashboardData.paidInvoices}
              unpaidInvoices={dashboardData.unpaidInvoices}
              totalRevenue={dashboardData.totalRevenue}
              outstandingPayments={dashboardData.outstandingPayments}
              monthlyEarnings={dashboardData.monthlyEarnings}
              yearlyGrowth={dashboardData.yearlyGrowth}
              currencySymbol={dashboardData.currencySymbol}
              onUpdate={(data) => console.log("Dashboard stats updated", data)}
            />

            {/* Financial Summary Section */}
            <FinancialSummary
              totalRevenue={dashboardData.totalRevenue}
              outstandingPayments={dashboardData.outstandingPayments}
              monthlyEarnings={dashboardData.monthlyEarnings}
              pendingInvoices={dashboardData.unpaidInvoices}
              currencySymbol={dashboardData.currencySymbol}
              onUpdate={(data) =>
                console.log("Financial summary updated", data)
              }
            />

            {/* Quick Actions Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                  onClick={handleCreateInvoice}
                >
                  <span className="font-medium text-blue-700">
                    Create New Invoice
                  </span>
                </button>
                <button
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                  onClick={handleAddClient}
                >
                  <span className="font-medium text-green-700">
                    Add New Client
                  </span>
                </button>
                <button
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors"
                  onClick={handleMarkAsPaid}
                >
                  <span className="font-medium text-purple-700">
                    Mark Invoice as Paid
                  </span>
                </button>
                <button
                  className="p-4 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                  onClick={handleMarkAsOverdue}
                >
                  <span className="font-medium text-red-700">
                    Mark as Overdue
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
