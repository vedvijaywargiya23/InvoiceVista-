import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  PlusCircle,
  Users,
  FileText,
  BarChart,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import DashboardStats from "./dashboard-stats";
import ClientsList from "../clients/clients-list";
import InvoicesList from "../invoices/invoices-list";
import CreateInvoice from "../invoices/create-invoice";
import UserProfile from "../profile/user-profile";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalInvoices: 0,
    paidInvoices: 0,
    unpaidInvoices: 0,
    totalRevenue: 0,
    outstandingPayments: 0,
    monthlyEarnings: 0,
    yearlyGrowth: 0,
    recentInvoices: [],
  });

  // Function to calculate dashboard data from invoices
  const calculateDashboardData = () => {
    try {
      const savedInvoices = JSON.parse(
        localStorage.getItem("invoices") || "[]",
      );

      // Calculate basic stats
      const totalInvoices = savedInvoices.length;
      const paidInvoices = savedInvoices.filter(
        (inv) => inv.status === "Paid" || inv.status === "paid",
      ).length;
      const unpaidInvoices = totalInvoices - paidInvoices;

      // Calculate financial stats
      let totalRevenue = 0;
      let outstandingPayments = 0;
      let monthlyEarnings = 0;

      // Current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      savedInvoices.forEach((invoice) => {
        // Extract numeric amount from string (remove currency symbol)
        const amountStr = invoice.amount || "0";
        const numericAmount = parseFloat(amountStr.replace(/[^0-9.]/g, ""));

        if (invoice.status === "Paid" || invoice.status === "paid") {
          totalRevenue += numericAmount;

          // Check if invoice was paid in current month
          const invoiceDate = new Date(invoice.date);
          if (
            invoiceDate.getMonth() === currentMonth &&
            invoiceDate.getFullYear() === currentYear
          ) {
            monthlyEarnings += numericAmount;
          }
        } else {
          outstandingPayments += numericAmount;
        }
      });

      // Calculate yearly growth (mock value for demo)
      const yearlyGrowth = totalInvoices > 0 ? 12 : 0;

      // Format recent invoices for the component
      const recentInvoices = savedInvoices.slice(0, 5).map((invoice) => ({
        id: invoice.id,
        client: invoice.client,
        amount: parseFloat(invoice.amount?.replace(/[^0-9.]/g, "") || "0"),
        date: invoice.date,
        status: invoice.status,
      }));

      setDashboardData({
        totalInvoices,
        paidInvoices,
        unpaidInvoices,
        totalRevenue,
        outstandingPayments,
        monthlyEarnings,
        yearlyGrowth,
        recentInvoices,
      });
    } catch (error) {
      console.error("Error calculating dashboard data:", error);
    }
  };

  // Check if we need to navigate to a specific tab based on location state
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Calculate dashboard data on mount and when invoices change
  useEffect(() => {
    calculateDashboardData();

    // Listen for invoice updates
    const handleInvoiceUpdate = () => {
      calculateDashboardData();
    };

    window.addEventListener("invoiceUpdated", handleInvoiceUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === "invoices") {
        calculateDashboardData();
      }
    });

    // Set up interval to periodically check for changes
    const intervalId = setInterval(calculateDashboardData, 2000);

    return () => {
      window.removeEventListener("invoiceUpdated", handleInvoiceUpdate);
      window.removeEventListener("storage", handleInvoiceUpdate);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <h1 className="text-xl font-bold text-blue-700">InvoiceVista</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Help
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          fixed md:static 
          top-[57px] 
          left-0 
          w-64 
          bg-white 
          h-[calc(100vh-57px)] 
          border-r 
          border-slate-200 
          p-4 
          z-30 
          transition-transform 
          duration-300 
          ease-in-out
        `}
        >
          <div className="space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("overview");
                setSidebarOpen(false);
              }}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "clients" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("clients");
                setSidebarOpen(false);
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Clients
            </Button>
            <Button
              variant={activeTab === "invoices" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("invoices");
                setSidebarOpen(false);
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Invoices
            </Button>
            <Button
              variant={activeTab === "create-invoice" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("create-invoice");
                setSidebarOpen(false);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("profile");
                setSidebarOpen(false);
              }}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto h-[calc(100vh-57px)] md:ml-0 ml-0">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <DashboardStats
                totalInvoices={dashboardData.totalInvoices}
                paidInvoices={dashboardData.paidInvoices}
                unpaidInvoices={dashboardData.unpaidInvoices}
                totalRevenue={dashboardData.totalRevenue}
                outstandingPayments={dashboardData.outstandingPayments}
                monthlyEarnings={dashboardData.monthlyEarnings}
                yearlyGrowth={dashboardData.yearlyGrowth}
                currencySymbol="₹"
              />
            </div>
          )}

          {activeTab === "clients" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Clients</h2>
              </div>
              <ClientsList />
            </div>
          )}

          {activeTab === "invoices" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Invoices</h2>
              </div>
              <InvoicesList />
            </div>
          )}

          {activeTab === "create-invoice" && (
            <div className="space-y-6">
              <CreateInvoice />
            </div>
          )}

          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
}
