export enum InvoiceTemplateType {
  CLASSIC = "classic",
  MODERN = "modern",
  MINIMAL = "minimal",
  PROFESSIONAL = "professional",
  CORPORATE = "corporate",
}

export interface InvoiceTemplateProps {
  type?: InvoiceTemplateType;
  invoiceData: any;
  currencySymbols: Record<string, string>;
  showNotes?: boolean;
}

export { default as ClassicTemplate } from "./classic-template";
export { default as ModernTemplate } from "./modern-template";
export { default as MinimalTemplate } from "./minimal-template";
export { default as ProfessionalTemplate } from "./professional-template";
export { default as CorporateTemplate } from "./corporate-template";
