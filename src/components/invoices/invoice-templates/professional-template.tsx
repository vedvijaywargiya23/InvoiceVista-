import { InvoiceTemplateProps } from "./index";

export default function ProfessionalTemplate({
  invoiceData,
  currencySymbols,
  showNotes = false,
}: InvoiceTemplateProps) {
  return (
    <div className="bg-white">
      {/* Header with accent color */}
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        INVOICE
      </h2>
      <div className="border-b-4 border-blue-600 pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {invoiceData.companyName}
            </h1>
            <p className="text-gray-600 whitespace-pre-line">
              {invoiceData.companyAddress}
            </p>
            <p className="text-gray-600">{invoiceData.companyEmail}</p>
            <p className="text-gray-600">{invoiceData.companyPhone}</p>
          </div>
          <div className="text-right">
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-700">
                <span className="font-semibold">Invoice #:</span>{" "}
                {invoiceData.invoiceNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span> {invoiceData.date}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Due Date:</span>{" "}
                {invoiceData.dueDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-8 p-5 bg-gray-50 rounded-md border-l-4 border-blue-600">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Bill To:</h3>
        <p className="text-gray-800 font-medium">{invoiceData.client}</p>
        {invoiceData.clientAddress && (
          <p className="text-gray-600 text-sm mt-1">
            {invoiceData.clientAddress}
          </p>
        )}
        {invoiceData.clientEmail && (
          <p className="text-gray-600 text-sm">{invoiceData.clientEmail}</p>
        )}
        {invoiceData.clientPhone && (
          <p className="text-gray-600 text-sm">{invoiceData.clientPhone}</p>
        )}
        {invoiceData.clientGstNumber && (
          <p className="text-gray-600 text-sm mt-1">
            GST: {invoiceData.clientGstNumber}
          </p>
        )}
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-md border border-gray-200 mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left w-1/2">Description</th>
              <th className="py-3 px-4 text-right w-1/6">Quantity</th>
              <th className="py-3 px-4 text-right w-1/6">Price</th>
              <th className="py-3 px-4 text-right w-1/6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item: any, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-gray-800">
                  {item.description || "Item"}
                </td>
                <td className="py-3 px-4 text-right text-gray-800">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right text-gray-800">
                  {currencySymbols[invoiceData.currency]}
                  {item.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-800">
                  {currencySymbols[invoiceData.currency]}
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mb-8">
        <div className="w-full bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-700">Subtotal:</span>
            <span className="text-gray-800">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-700">
              {invoiceData.taxType} ({invoiceData.taxRate}%):
            </span>
            <span className="text-gray-800">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-300 font-bold text-lg mt-2 pt-2">
            <span className="text-gray-800">Total:</span>
            <span className="text-blue-600">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes - Only show if enabled */}
      {showNotes && invoiceData.notes && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-2 text-gray-800">Notes:</h3>
          <p className="text-gray-600">{invoiceData.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}
