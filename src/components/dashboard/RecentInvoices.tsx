import React from "react";
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
  status: "paid" | "pending" | "overdue";
}

interface RecentInvoicesProps {
  invoices?: Invoice[];
  title?: string;
}

const RecentInvoices = ({
  invoices = [],
  title = "Recent Invoices",
}: RecentInvoicesProps) => {
  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
  const getStatusBadgeVariant = (status: Invoice["status"]) => {
    switch (status) {
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
      <h3 className="text-lg font-medium mb-4 text-gray-800">{title}</h3>
      {invoices.length === 0 ? (
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
              {invoices.map((invoice) => (
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
