import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  PlusCircle,
  Trash2,
  Download,
  Send,
  Mail,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoiceTemplateSelector from "./invoice-template-selector";
import {
  InvoiceTemplateType,
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
  ProfessionalTemplate,
  CorporateTemplate,
} from "./invoice-templates";

export default function CreateInvoice() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplateType>(
    InvoiceTemplateType.CLASSIC,
  );
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    date: format(new Date(), "yyyy-MM-dd"),
    dueDate: format(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd",
    ),
    client: "",
    companyLogo: null,
    companyName: "Your Company",
    companyAddress: "123 Business St, City, Country",
    companyEmail: "contact@yourcompany.com",
    companyPhone: "+1 (555) 123-4567",
    notes: "Thank you for your business!",
    items: [{ id: 1, description: "", quantity: 1, price: 0, amount: 0 }],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    currency: "USD",
  });

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
    CAD: "C$",
    AUD: "A$",
  };

  // Mock client list
  const clients = [
    {
      id: 1,
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      address: "123 Acme St, Acme City, AC 12345",
    },
    {
      id: 2,
      name: "Globex Industries",
      email: "info@globex.com",
      address: "456 Globex Ave, Globex City, GX 67890",
    },
    {
      id: 3,
      name: "Stark Enterprises",
      email: "tony@stark.com",
      address: "789 Stark Tower, New York, NY 10001",
    },
    {
      id: 4,
      name: "Wayne Industries",
      email: "bruce@wayne.com",
      address: "101 Wayne Manor, Gotham City, GC 54321",
    },
    {
      id: 5,
      name: "Umbrella Corporation",
      email: "info@umbrella.com",
      address: "202 Umbrella Blvd, Raccoon City, RC 98765",
    },
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData({
          ...invoiceData,
          companyLogo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find((c) => c.id.toString() === clientId);
    if (selectedClient) {
      setInvoiceData({
        ...invoiceData,
        client: selectedClient.name,
      });
    }
  };

  // Check if there are any clients
  const hasClients = clients.length > 0;

  const addItem = () => {
    const newItem = {
      id: invoiceData.items.length + 1,
      description: "",
      quantity: 1,
      price: 0,
      amount: 0,
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const removeItem = (id: number) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({
        ...invoiceData,
        items: invoiceData.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    const updatedItems = invoiceData.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        // Recalculate amount if quantity or price changes
        if (field === "quantity" || field === "price") {
          const quantity = field === "quantity" ? Number(value) : item.quantity;
          const price = field === "price" ? Number(value) : item.price;
          updatedItem.amount = quantity * price;
        }

        return updatedItem;
      }
      return item;
    });

    // Recalculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (invoiceData.taxRate / 100);
    const total = subtotal + taxAmount;

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
      subtotal,
      taxAmount,
      total,
    });
  };

  const updateTaxRate = (value: string) => {
    const taxRate = Number(value);
    const taxAmount = invoiceData.subtotal * (taxRate / 100);
    const total = invoiceData.subtotal + taxAmount;

    setInvoiceData({
      ...invoiceData,
      taxRate,
      taxAmount,
      total,
    });
  };

  const renderSelectedTemplate = () => {
    const templateProps = {
      invoiceData,
      currencySymbols,
      type: selectedTemplate,
    };

    switch (selectedTemplate) {
      case InvoiceTemplateType.MODERN:
        return <ModernTemplate {...templateProps} />;
      case InvoiceTemplateType.MINIMAL:
        return <MinimalTemplate {...templateProps} />;
      case InvoiceTemplateType.PROFESSIONAL:
        return <ProfessionalTemplate {...templateProps} />;
      case InvoiceTemplateType.CORPORATE:
        return <CorporateTemplate {...templateProps} />;
      case InvoiceTemplateType.CLASSIC:
      default:
        return <ClassicTemplate {...templateProps} />;
    }
  };

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

    try {
      // Create a temporary div with white background for PDF generation
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.background = "white";
      tempDiv.style.width = "800px";

      // Create a React root and render the selected template
      const templateContainer = document.createElement("div");
      templateContainer.style.width = "100%";
      templateContainer.style.background = "white";

      // Clone the invoice template content
      const clone = invoiceRef.current.cloneNode(true) as HTMLElement;
      templateContainer.appendChild(clone);
      tempDiv.appendChild(templateContainer);
      document.body.appendChild(tempDiv);

      // Generate PDF
      const canvas = await html2canvas(templateContainer, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      // Add company logo if available
      if (invoiceData.companyLogo) {
        try {
          // Add logo at the top of the PDF
          pdf.addImage(invoiceData.companyLogo, "PNG", imgX, 10, 40, 20);
        } catch (logoError) {
          console.error("Error adding logo to PDF:", logoError);
          // Continue without the logo if there's an error
        }
      }

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      pdf.save(`${invoiceData.invoiceNumber}.pdf`);

      // Clean up
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  const sendInvoice = () => {
    // Create mailto link with invoice details
    const subject = `Invoice ${invoiceData.invoiceNumber} from ${invoiceData.companyName}`;
    const body = `Dear ${invoiceData.client},\n\nPlease find attached invoice ${invoiceData.invoiceNumber} for ${currencySymbols[invoiceData.currency]}${invoiceData.total.toFixed(2)}.\n\nDue date: ${invoiceData.dueDate}\n\nThank you for your business!\n\nRegards,\n${invoiceData.companyName}`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  const saveInvoice = () => {
    // In a real app, this would save to a database
    alert("Invoice saved successfully!");
    // For demo purposes, we'll save to localStorage
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    savedInvoices.push({
      ...invoiceData,
      id: `INV-${Math.floor(Math.random() * 10000)}`,
      status: "Pending",
    });
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold">Create New Invoice</h2>
        <div className="flex flex-wrap w-full sm:w-auto gap-2">
          <Button
            onClick={saveInvoice}
            className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
          >
            Save Invoice
          </Button>
          <Button
            onClick={generatePDF}
            variant="outline"
            className="border-blue-600 text-blue-600 flex-1 sm:flex-none"
          >
            <Download className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
          <Button
            onClick={sendInvoice}
            variant="outline"
            className="border-blue-600 text-blue-600 flex-1 sm:flex-none"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Invoice
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Invoice Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceTemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </CardContent>
      </Card>

      <div className="hidden">
        <div ref={invoiceRef}>{renderSelectedTemplate()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      invoiceNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, date: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                {hasClients ? (
                  <Select onValueChange={handleClientChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="border rounded-md p-3 bg-gray-50 text-sm text-gray-600">
                    No clients found. Please create a client first.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Your Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Company Logo</Label>
              <div className="flex items-center gap-4">
                {invoiceData.companyLogo && (
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img
                      src={invoiceData.companyLogo}
                      alt="Company Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <Input
                  id="companyLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={invoiceData.companyName}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={invoiceData.companyAddress}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    companyAddress: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={invoiceData.companyEmail}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      companyEmail: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Phone</Label>
                <Input
                  id="companyPhone"
                  value={invoiceData.companyPhone}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      companyPhone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Items */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500">
              <div className="col-span-5 sm:col-span-5">Description</div>
              <div className="col-span-2 sm:col-span-2">Quantity</div>
              <div className="col-span-2 sm:col-span-2">Price</div>
              <div className="col-span-2 sm:col-span-2">Amount</div>
              <div className="col-span-1 sm:col-span-1"></div>
            </div>

            {invoiceData.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 sm:gap-4 items-center"
              >
                <div className="col-span-5 sm:col-span-5">
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, "quantity", Number(e.target.value))
                    }
                    className="w-full px-1 sm:px-3"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.id, "price", Number(e.target.value))
                    }
                    className="w-full px-1 sm:px-3"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <Input
                    type="number"
                    value={item.amount}
                    readOnly
                    className="bg-gray-50 w-full px-1 sm:px-3"
                  />
                </div>
                <div className="col-span-1 sm:col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={invoiceData.items.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="mt-2" onClick={addItem}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-end space-y-2">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      {currencySymbols[invoiceData.currency]}
                      {invoiceData.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Currency:</span>
                    <Select
                      value={invoiceData.currency}
                      onValueChange={(value) =>
                        setInvoiceData({ ...invoiceData, currency: value })
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Tax Rate (%):</span>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      className="w-20"
                      value={invoiceData.taxRate}
                      onChange={(e) => updateTaxRate(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <span>Tax Amount:</span>
                    <span>
                      {currencySymbols[invoiceData.currency]}
                      {invoiceData.taxAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>
                      {currencySymbols[invoiceData.currency]}
                      {invoiceData.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, notes: e.target.value })
            }
            placeholder="Add any notes or payment instructions"
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
