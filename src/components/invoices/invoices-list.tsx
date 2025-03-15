import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Eye,
  Download,
  Send,
  CheckCircle,
  Search,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
}

export default function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Load invoices from localStorage on component mount
  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      try {
        setInvoices(JSON.parse(savedInvoices));
      } catch (e) {
        console.error("Error parsing invoices from localStorage", e);
      }
    }
  }, []);

  const handleCreateInvoice = () => {
    navigate("/dashboard", { state: { tab: "create-invoice" } });
  };

  const handleViewInvoice = (invoice: Invoice) => {
    navigate("/dashboard", {
      state: {
        tab: "view-invoice",
        invoiceId: invoice.id,
      },
    });
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // In a real app, this would generate a PDF with proper invoice data
    // For now, we'll create a simple PDF with invoice details
    import("jspdf").then((jsPDFModule) => {
      const jsPDF = jsPDFModule.default;
      const doc = new jsPDF();

      // Add invoice header
      doc.setFontSize(22);
      doc.setTextColor(59, 130, 246); // Blue color
      doc.text("INVOICE", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Invoice #: ${invoice.id}`, 20, 40);
      doc.text(`Date: ${invoice.date}`, 20, 50);
      doc.text(`Due Date: ${invoice.dueDate}`, 20, 60);
      doc.text(`Client: ${invoice.client}`, 20, 70);
      doc.text(`Amount: ${invoice.amount}`, 20, 80);
      doc.text(`Status: ${invoice.status}`, 20, 90);

      // Add footer
      doc.setFontSize(10);
      doc.text("Thank you for your business!", 105, 120, { align: "center" });

      // Save the PDF
      doc.save(`${invoice.id}.pdf`);
    });
  };

  const handleSendInvoice = (invoice: Invoice) => {
    // Create mailto link with invoice details
    const subject = `Invoice ${invoice.id}`;
    const body = `Dear ${invoice.client},\n\nPlease find attached invoice ${invoice.id} for ${invoice.amount}.\n\nDue date: ${invoice.dueDate}\n\nThank you for your business!`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === invoice.id ? { ...inv, status: "Paid" } : inv,
    );
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleCreateInvoice}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-md border p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No invoices yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first invoice to start tracking payments.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateInvoice}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Invoice
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadInvoice(invoice)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSendInvoice(invoice)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      {invoice.status !== "Paid" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMarkAsPaid(invoice)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
