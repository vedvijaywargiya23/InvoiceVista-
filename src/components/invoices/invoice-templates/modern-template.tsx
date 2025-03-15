import { InvoiceTemplateProps } from "./index";

export default function ModernTemplate({
  invoiceData,
  currencySymbols,
}: InvoiceTemplateProps) {
  return (
    <div className="p-8 bg-white">
      {/* Header with background */}
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {invoiceData.companyName}
            </h1>
            <p className="text-blue-100 text-sm">
              {invoiceData.companyAddress}
            </p>
            <p className="text-blue-100 text-sm">{invoiceData.companyEmail}</p>
            <p className="text-blue-100 text-sm">{invoiceData.companyPhone}</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
            <p className="text-blue-100 text-sm">
              <span className="font-semibold">Invoice #:</span>{" "}
              {invoiceData.invoiceNumber}
            </p>
            <p className="text-blue-100 text-sm">
              <span className="font-semibold">Date:</span> {invoiceData.date}
            </p>
            <p className="text-blue-100 text-sm">
              <span className="font-semibold">Due Date:</span>{" "}
              {invoiceData.dueDate}
            </p>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-8 p-5 bg-gray-50 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Bill To:</h3>
        <p className="text-gray-800 font-medium">{invoiceData.client}</p>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-600">
                Description
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">
                Quantity
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">
                Price
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item: any, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-gray-700">
                  {item.description || "Item"}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {currencySymbols[invoiceData.currency]}
                  {item.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {currencySymbols[invoiceData.currency]}
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-600">Subtotal:</span>
            <span className="text-gray-800">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-600">
              Tax ({invoiceData.taxRate}%):
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

      {/* Notes */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold mb-2 text-gray-700">Notes:</h3>
        <p className="text-gray-600">{invoiceData.notes}</p>
      </div>
    </div>
  );
}
