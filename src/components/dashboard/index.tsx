import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  PlusCircle,
  Users,
  FileText,
  Settings,
  BarChart,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import DashboardStats from "./dashboard-stats";
import RevenueChart from "./RevenueChart";
import RecentInvoices from "./RecentInvoices";
import ClientsList from "../clients/clients-list";
import InvoicesList from "../invoices/invoices-list";
import CreateInvoice from "../invoices/create-invoice";
import UserProfile from "../profile/user-profile";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("settings");
                setSidebarOpen(false);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
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
              <DashboardStats />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RevenueChart />
                <RecentInvoices />
              </div>
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

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Business Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 mb-4">
                    Configure your business details and branding options
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Your Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-md"
                          placeholder="contact@yourcompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Business Address
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows={3}
                        placeholder="Your business address"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Tax ID / VAT Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Tax ID / VAT Number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Company Logo
                      </label>
                      <input type="file" className="w-full p-2" />
                    </div>

                    <div className="pt-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
}
