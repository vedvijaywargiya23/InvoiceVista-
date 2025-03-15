import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
        {/* Left side - Image and branding */}
        <div className="w-full md:w-1/2 bg-blue-700 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">InvoiceVista</h1>
            <p className="text-blue-100">Professional Invoicing Platform</p>
          </div>

          <div className="space-y-6 hidden md:block">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-blue-100">
                  Create and manage professional invoices
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-blue-100">
                  Track payments and manage clients
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-blue-100">
                  Generate detailed financial reports
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-blue-200">
              © 2023 InvoiceVista. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
