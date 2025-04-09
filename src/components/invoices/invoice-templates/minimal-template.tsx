import { InvoiceTemplateProps } from "./index";

export default function MinimalTemplate({
  invoiceData,
  currencySymbols,
  showNotes = false,
}: InvoiceTemplateProps) {
  return (
    <div className="bg-white">
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
          {invoiceData.companyLogo && (
            <div className="flex justify-end mb-2">
              <img
                src={invoiceData.companyLogo}
                alt="Company Logo"
                className="h-8 w-auto mr-4"
              />
            </div>
          )}
          <h2 className="text-2xl font-light tracking-wide text-gray-800 text-center">
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
        {invoiceData.clientAddress && (
          <p className="text-gray-600 text-sm">{invoiceData.clientAddress}</p>
        )}
        {invoiceData.clientEmail && (
          <p className="text-gray-600 text-sm">{invoiceData.clientEmail}</p>
        )}
        {invoiceData.clientPhone && (
          <p className="text-gray-600 text-sm">{invoiceData.clientPhone}</p>
        )}
        {invoiceData.clientGstNumber && (
          <p className="text-gray-600 text-sm">
            GST: {invoiceData.clientGstNumber}
          </p>
        )}
      </div>

      {/* Items Table - Minimal */}
      <table className="w-full mb-12">
        <thead>
          <tr>
            <th className="py-2 text-left text-sm font-normal text-gray-500 w-1/2">
              DESCRIPTION
            </th>
            <th className="py-2 text-right text-sm font-normal text-gray-500 w-1/6">
              QTY
            </th>
            <th className="py-2 text-right text-sm font-normal text-gray-500 w-1/6">
              PRICE
            </th>
            <th className="py-2 text-right text-sm font-normal text-gray-500 w-1/6">
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
            <span className="text-gray-500">
              {invoiceData.taxType} ({invoiceData.taxRate}%)
            </span>
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

      {/* Notes - Only show if enabled */}
      {showNotes && invoiceData.notes && (
        <div className="text-sm text-gray-500 border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-medium mb-2">Notes:</h3>
          <p>{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
}
