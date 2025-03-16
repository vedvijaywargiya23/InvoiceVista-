import { InvoiceTemplateProps } from "./index";

export default function ClassicTemplate({
  invoiceData,
  currencySymbols,
  showNotes = false,
}: InvoiceTemplateProps) {
  return (
    <div className="p-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {invoiceData.companyLogo && (
            <img
              src={invoiceData.companyLogo}
              alt="Company Logo"
              className="h-16 mb-4"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-800">
            {invoiceData.companyName}
          </h1>
          <p className="text-gray-600 whitespace-pre-line">
            {invoiceData.companyAddress}
          </p>
          <p className="text-gray-600">{invoiceData.companyEmail}</p>
          <p className="text-gray-600">{invoiceData.companyPhone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center">
            INVOICE
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Invoice #:</span>{" "}
            {invoiceData.invoiceNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Date:</span> {invoiceData.date}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Due Date:</span>{" "}
            {invoiceData.dueDate}
          </p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
        <p className="text-gray-800 font-medium">{invoiceData.client}</p>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left w-1/2">Description</th>
            <th className="py-3 px-4 text-right w-1/6">Quantity</th>
            <th className="py-3 px-4 text-right w-1/6">Price</th>
            <th className="py-3 px-4 text-right w-1/6">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item: any, index: number) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-4">{item.description || "Item"}</td>
              <td className="py-3 px-4 text-right">{item.quantity}</td>
              <td className="py-3 px-4 text-right">
                {currencySymbols[invoiceData.currency]}
                {item.price.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right">
                {currencySymbols[invoiceData.currency]}
                {item.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="font-medium">Subtotal:</span>
            <span>
              {currencySymbols[invoiceData.currency]}
              {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Tax ({invoiceData.taxRate}%):</span>
            <span>
              {currencySymbols[invoiceData.currency]}
              {invoiceData.taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-300 font-bold text-lg">
            <span>Total:</span>
            <span>
              {currencySymbols[invoiceData.currency]}
              {invoiceData.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes - Only show if enabled */}
      {showNotes && invoiceData.notes && (
        <div className="border-t border-gray-300 pt-4">
          <h3 className="font-semibold mb-2">Notes:</h3>
          <p className="text-gray-600">{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
}
