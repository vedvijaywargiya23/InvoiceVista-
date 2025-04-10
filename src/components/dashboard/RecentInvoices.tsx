import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: string;
  status: string;
}

interface RecentInvoicesProps {
  invoices?: Invoice[];
  title?: string;
  currencySymbol?: string;
}

const RecentInvoices = ({
  invoices = [],
  title = "Recent Invoices",
  currencySymbol = "$",
}: RecentInvoicesProps) => {
  const [displayInvoices, setDisplayInvoices] = useState<Invoice[]>(invoices);

  // Update display invoices when props change or when invoices are updated
  useEffect(() => {
    if (invoices && invoices.length > 0) {
      setDisplayInvoices(invoices);
    } else {
      // If no invoices are provided via props, load from localStorage
      try {
        const savedInvoices = JSON.parse(
          localStorage.getItem("invoices") || "[]",
        );
        if (savedInvoices.length > 0) {
          const formattedInvoices = savedInvoices
            .slice(0, 5)
            .map((invoice: any) => ({
              id: invoice.id,
              client: invoice.client,
              amount: parseFloat(
                invoice.amount?.replace(/[^0-9.]/g, "") || "0",
              ),
              date: invoice.date,
              status: invoice.status.toLowerCase(),
            }));
          setDisplayInvoices(formattedInvoices);
        }
      } catch (error) {
        console.error("Error loading invoices:", error);
      }
    }
  }, [invoices]);

  // Listen for invoice updates
  useEffect(() => {
    const handleInvoiceUpdate = () => {
      if (invoices.length === 0) {
        // Only update if not using prop-provided invoices
        try {
          const savedInvoices = JSON.parse(
            localStorage.getItem("invoices") || "[]",
          );
          if (savedInvoices.length > 0) {
            const formattedInvoices = savedInvoices
              .slice(0, 5)
              .map((invoice: any) => ({
                id: invoice.id,
                client: invoice.client,
                amount: parseFloat(
                  invoice.amount?.replace(/[^0-9.]/g, "") || "0",
                ),
                date: invoice.date,
                status: invoice.status.toLowerCase(),
              }));
            setDisplayInvoices(formattedInvoices);
          }
        } catch (error) {
          console.error("Error updating invoices:", error);
        }
      }
    };

    window.addEventListener("invoiceUpdated", handleInvoiceUpdate);
    return () =>
      window.removeEventListener("invoiceUpdated", handleInvoiceUpdate);
  }, [invoices]);

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencySymbol === "₹" ? "INR" : "USD",
    }).format(amount);
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Function to get badge variant based on status
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "secondary";
      case "pending":
        return "default";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <a
          href="/invoices"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          See All Invoices
        </a>
      </div>
      {displayInvoices.length === 0 ? (
        <div className="py-6 text-center text-gray-500">
          <p>No recent invoices found</p>
          <p className="text-sm mt-2">
            Create your first invoice to see it here
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RecentInvoices;
