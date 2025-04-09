import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  BarChart3,
  Users,
  Shield,
  ChevronRight,
  LineChart,
  PieChart,
  BarChart,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-blue-700">InvoiceVista</h1>
          </div>
          <div className="flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80')] bg-no-repeat bg-cover opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Professional <span className="text-blue-300">Invoicing</span>{" "}
                Made Simple
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Create beautiful invoices, manage clients, and track payments
                all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-white text-blue-700 hover:bg-blue-50 text-lg h-12 px-8 shadow-lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-8 flex items-center text-blue-100">
                <Shield className="h-5 w-5 mr-2" />
                <span>
                  Secure, reliable, and trusted by thousands of businesses
                </span>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Invoice #1234
                    </h3>
                    <p className="text-gray-500">Due: Oct 30, 2023</p>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Paid
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Website Redesign</span>
                    <span className="font-medium text-gray-800">$1,200.00</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">SEO Optimization</span>
                    <span className="font-medium text-gray-800">$800.00</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Content Creation</span>
                    <span className="font-medium text-gray-800">$600.00</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">$2,600.00</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <LineChart className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Powerful Analytics at Your Fingertips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Revenue Tracking
              </h3>
              <p className="text-gray-600 mb-6">
                Monitor your monthly and yearly revenue with detailed charts and
                insights.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg flex justify-center">
                <div className="w-full h-40 relative">
                  <div className="absolute bottom-0 left-0 w-1/12 h-1/4 bg-blue-300 rounded-t"></div>
                  <div className="absolute bottom-0 left-[8.33%] w-1/12 h-1/3 bg-blue-400 rounded-t"></div>
                  <div className="absolute bottom-0 left-[16.66%] w-1/12 h-1/2 bg-blue-500 rounded-t"></div>
                  <div className="absolute bottom-0 left-[25%] w-1/12 h-1/3 bg-blue-400 rounded-t"></div>
                  <div className="absolute bottom-0 left-[33.33%] w-1/12 h-2/3 bg-blue-600 rounded-t"></div>
                  <div className="absolute bottom-0 left-[41.66%] w-1/12 h-1/2 bg-blue-500 rounded-t"></div>
                  <div className="absolute bottom-0 left-[50%] w-1/12 h-3/4 bg-blue-700 rounded-t"></div>
                  <div className="absolute bottom-0 left-[58.33%] w-1/12 h-1/2 bg-blue-500 rounded-t"></div>
                  <div className="absolute bottom-0 left-[66.66%] w-1/12 h-2/5 bg-blue-400 rounded-t"></div>
                  <div className="absolute bottom-0 left-[75%] w-1/12 h-3/5 bg-blue-500 rounded-t"></div>
                  <div className="absolute bottom-0 left-[83.33%] w-1/12 h-4/5 bg-blue-700 rounded-t"></div>
                  <div className="absolute bottom-0 left-[91.66%] w-1/12 h-3/4 bg-blue-600 rounded-t"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Status
              </h3>
              <p className="text-gray-600 mb-6">
                Track the status of all your invoices with intuitive pie charts.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg flex justify-center items-center">
                <div className="relative w-32 h-32">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-blue-600"
                    style={{
                      clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-blue-400"
                    style={{ clipPath: "polygon(50% 50%, 50% 0, 0 0, 0 50%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-blue-300"
                    style={{
                      clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-gray-300"
                    style={{
                      clipPath:
                        "polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="ml-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm">Paid (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm">Pending (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
                    <span className="text-sm">Overdue (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm">Draft (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Client Growth
              </h3>
              <p className="text-gray-600 mb-6">
                Monitor your client acquisition and retention with detailed
                analytics.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="h-40 w-full relative">
                  {/* Line chart */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gray-300"></div>
                  <div className="absolute inset-y-0 left-0 w-px bg-gray-300"></div>

                  {/* Line */}
                  <svg
                    className="absolute inset-0"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,90 L10,85 L20,80 L30,70 L40,65 L50,55 L60,40 L70,35 L80,25 L90,20 L100,10"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,90 L10,85 L20,80 L30,70 L40,65 L50,55 L60,40 L70,35 L80,25 L90,20 L100,10 L100,100 L0,100 Z"
                      fill="rgba(37, 99, 235, 0.1)"
                    />
                  </svg>

                  {/* Data points */}
                  <div className="absolute left-[10%] bottom-[15%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[20%] bottom-[20%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[30%] bottom-[30%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[40%] bottom-[35%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[50%] bottom-[45%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[60%] bottom-[60%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[70%] bottom-[65%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[80%] bottom-[75%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[90%] bottom-[80%] w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute left-[100%] bottom-[90%] w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose InvoiceVista?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-600">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <FileText className="text-blue-600 h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Professional Invoices
            </h3>
            <p className="text-gray-600 mb-4">
              Create beautiful, customizable invoices with multiple professional
              templates to match your brand identity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-600">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Users className="text-blue-600 h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Client Management
            </h3>
            <p className="text-gray-600 mb-4">
              Easily manage your clients' information, track their invoices, and
              maintain professional relationships.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-600">
            <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <BarChart3 className="text-blue-600 h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Financial Insights
            </h3>
            <p className="text-gray-600 mb-4">
              Gain valuable insights into your business with comprehensive
              financial reports and visualizations.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 py-16" id="pricing">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Free</h3>
              <p className="text-gray-500 mt-2">
                For individuals just getting started
              </p>
              <p className="text-3xl font-bold mt-4">
                ₹0
                <span className="text-gray-500 text-base font-normal">
                  /month
                </span>
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Up to 5 invoices per month</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic invoice templates</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>PDF export with watermark</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Up to 10 clients</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic analytics</span>
              </li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>

          {/* Basic Plan */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-blue-600 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Basic</h3>
              <p className="text-gray-500 mt-2">For small businesses</p>
              <p className="text-3xl font-bold mt-4">
                ₹199
                <span className="text-gray-500 text-base font-normal">
                  /month
                </span>
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Unlimited invoices</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>All invoice templates</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>PDF export without watermark</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Up to 50 clients</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced analytics</span>
              </li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/signup")}
            >
              Subscribe Now
            </Button>
          </div>

          {/* Advanced Plan */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Advanced</h3>
              <p className="text-gray-500 mt-2">For growing businesses</p>
              <p className="text-3xl font-bold mt-4">
                ₹499
                <span className="text-gray-500 text-base font-normal">
                  /month
                </span>
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Everything in Basic</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Unlimited clients</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Custom branding options</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Team access (up to 5 users)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced reporting & forecasting</span>
              </li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/signup")}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16" id="testimonials">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold">John Smith</h4>
                <p className="text-sm text-gray-500">CEO, TechStart</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "InvoiceVista has transformed how we handle our invoicing. The
              professional templates and easy client management save us hours
              every week."
            </p>
            <div className="mt-4 flex text-yellow-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Freelance Designer</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "As a freelancer, keeping track of invoices was always a
              challenge. InvoiceVista makes it simple and professional. My
              clients are impressed!"
            </p>
            <div className="mt-4 flex text-yellow-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold">Michael Chen</h4>
                <p className="text-sm text-gray-500">
                  Finance Director, GrowCorp
                </p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The analytics and reporting features have given us insights we
              never had before. We can now make better financial decisions based
              on real data."
            </p>
            <div className="mt-4 flex text-yellow-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to streamline your invoicing?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust InvoiceVista for their
            professional invoicing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/signup")}
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg h-12 px-8 shadow-lg"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12" id="contact">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">InvoiceVista</h2>
              </div>
              <p>Professional Invoicing Platform</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h3 className="text-white font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Templates
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p>
              © {new Date().getFullYear()} InvoiceVista. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
