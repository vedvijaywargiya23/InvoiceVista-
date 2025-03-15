import { useState } from "react";
import { Button } from "../ui/button";
import { InvoiceTemplateType } from "./invoice-templates";
import { Check } from "lucide-react";

interface InvoiceTemplateSelectorProps {
  selectedTemplate: InvoiceTemplateType;
  onSelectTemplate: (template: InvoiceTemplateType) => void;
}

export default function InvoiceTemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: InvoiceTemplateSelectorProps) {
  const templates = [
    {
      id: InvoiceTemplateType.CLASSIC,
      name: "Classic",
      description: "Traditional invoice layout with clean formatting",
    },
    {
      id: InvoiceTemplateType.MODERN,
      name: "Modern",
      description: "Contemporary design with blue header",
    },
    {
      id: InvoiceTemplateType.MINIMAL,
      name: "Minimal",
      description: "Simple, elegant design with minimal styling",
    },
    {
      id: InvoiceTemplateType.PROFESSIONAL,
      name: "Professional",
      description: "Business-focused design with accent colors",
    },
    {
      id: InvoiceTemplateType.CORPORATE,
      name: "Corporate",
      description: "Formal design with dark header for corporate use",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Invoice Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800">{template.name}</h4>
              {selectedTemplate === template.id && (
                <div className="bg-blue-500 text-white rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
