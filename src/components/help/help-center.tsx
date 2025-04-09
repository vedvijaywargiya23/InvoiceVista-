import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, FileText, Users, CreditCard, HelpCircle } from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "general",
      question: "What is InvoiceVista?",
      answer:
        "InvoiceVista is a professional invoicing platform designed to help businesses and freelancers create, manage, and track invoices. It offers features like client management, customizable invoice templates, and financial insights.",
    },
    {
      category: "general",
      question: "Is there a free plan available?",
      answer:
        "Yes, InvoiceVista offers a free plan with basic features. Premium plans are available for users who need advanced features like additional templates, unlimited clients, and detailed financial reports.",
    },
    {
      category: "invoices",
      question: "How do I create a new invoice?",
      answer:
        "To create a new invoice, navigate to the Invoices section and click on 'Create Invoice'. Select a client (or add a new one), add invoice items, choose a template, and customize as needed. You can then save, download as PDF, or send the invoice directly to your client.",
    },
    {
      category: "invoices",
      question: "Can I customize invoice templates?",
      answer:
        "Yes, InvoiceVista offers multiple professional templates that you can customize. You can add your logo, change colors, and adjust layouts to match your brand identity.",
    },
    {
      category: "clients",
      question: "How do I add a new client?",
      answer:
        "To add a new client, go to the Clients section and click 'Add New Client'. Fill in the client details such as name, email, phone number, and address. You can also add clients directly when creating a new invoice.",
    },
    {
      category: "clients",
      question: "Can I import clients from other systems?",
      answer:
        "Currently, you can add clients manually. We're working on adding import functionality from CSV files and popular CRM systems in a future update.",
    },
    {
      category: "payments",
      question: "How can clients pay their invoices?",
      answer:
        "InvoiceVista allows you to specify payment instructions in your invoices. You can include your bank details, PayPal information, or other payment methods. We're working on adding direct payment links in a future update.",
    },
    {
      category: "payments",
      question: "How do I mark an invoice as paid?",
      answer:
        "In the Invoices section, find the invoice you want to update, click on the options menu, and select 'Mark as Paid'. This will update the invoice status and reflect in your financial reports.",
    },
    {
      category: "account",
      question: "How do I update my business information?",
      answer:
        "Go to your Profile page to update your business information. You can change your business name, contact details, logo, and other information that appears on your invoices.",
    },
    {
      category: "account",
      question: "How do I change my password?",
      answer:
        "You can change your password in the Security tab of your Profile page. You'll need to enter your current password and then your new password twice to confirm.",
    },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-500">
              Find answers to common questions and learn how to use InvoiceVista
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Invoicing Guide</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Learn how to create and manage professional invoices
                  </p>
                  <Button variant="link" className="text-blue-600 p-0">
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Client Management</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Tips for organizing and managing your client information
                  </p>
                  <Button variant="link" className="text-blue-600 p-0">
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-4">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium mb-2">Payment Processing</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Understanding payment options and tracking
                  </p>
                  <Button variant="link" className="text-blue-600 p-0">
                    View Guide
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" /> Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    <TabsTrigger value="clients">Clients</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>

                  {[
                    "general",
                    "invoices",
                    "clients",
                    "payments",
                    "account",
                  ].map((category) => (
                    <TabsContent key={category} value={category}>
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFaqs
                          .filter((faq) => faq.category === category)
                          .map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Still need help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you couldn't find the answer you were looking for, our
                  support team is here to help.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
