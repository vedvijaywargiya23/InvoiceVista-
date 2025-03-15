import { InvoiceTemplateProps } from "./index";

export default function MinimalTemplate({
  invoiceData,
  currencySymbols,
}: InvoiceTemplateProps) {
  return (
    <div className="p-8 bg-white">
      {/* Simple Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-gray-800">
            {invoiceData.companyName}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {invoiceData.companyAddress}
          </p>
          <p className="text-gray-500 text-sm">{invoiceData.companyEmail}</p>
          <p className="text-gray-500 text-sm">{invoiceData.companyPhone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-light tracking-wide text-gray-800">
            INVOICE
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            #{invoiceData.invoiceNumber}
          </p>
          <p className="text-gray-500 text-sm">Issued: {invoiceData.date}</p>
          <p className="text-gray-500 text-sm">Due: {invoiceData.dueDate}</p>
        </div>
      </div>

      {/* Client Info - Minimal */}
      <div className="mb-12">
        <p className="text-sm text-gray-500 mb-1">BILLED TO</p>
        <p className="text-gray-800">{invoiceData.client}</p>
      </div>

      {/* Items Table - Minimal */}
      <table className="w-full mb-12">
        <thead>
          <tr>
            <th className="py-2 text-left text-sm font-normal text-gray-500">
              DESCRIPTION
            </th>
            <th className="py-2 text-right text-sm font-normal text-gray-500">
              QTY
            </th>
            <th className="py-2 text-right text-sm font-normal text-gray-500">
              PRICE
            </th>
            <th className="py-2 text-right text-sm font-normal text-gray-500">
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item: any, index: number) => (
            <tr key={index} className="border-t border-gray-100">
              <td className="py-4 text-gray-800">
                {item.description || "Item"}
              </td>
              <td className="py-4 text-right text-gray-800">{item.quantity}</td>
              <td className="py-4 text-right text-gray-800">
                {currencySymbols[invoiceData.currency]}
                {item.price.toFixed(2)}
              </td>
              <td className="py-4 text-right text-gray-800">
                {currencySymbols[invoiceData.currency]}
                {item.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals - Minimal */}
      <div className="flex justify-end mb-12">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-800">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Tax ({invoiceData.taxRate}%)</span>
            <span className="text-gray-800">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
            <span className="font-medium text-gray-800">Total</span>
            <span className="font-medium text-gray-800">
              {currencySymbols[invoiceData.currency]}
              {invoiceData.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes - Minimal */}
      <div className="text-sm text-gray-500">
        <p>{invoiceData.notes}</p>
      </div>
    </div>
  );
}
