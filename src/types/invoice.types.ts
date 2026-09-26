/**
 * Invoice & Financial Ledger Types
 * LSF Security & Personal Protection Services
 */

export type InvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT' | 'DISPUTED';

export type PaymentMethodType = 'WIRE_TRANSFER' | 'ESCROW' | 'CREDIT_CARD' | 'CRYPTO_USDC' | 'GOVERNMENT_PO';

export interface InvoiceLineItem {
  id: string;
  description: string;
  unit: 'HOURS' | 'DAYS' | 'OPERATORS' | 'FLAT_FEE' | 'MILEAGE';
  quantity: number;
  unitRate: number; // in USD
  taxRate: number; // decimal (e.g. 0.0825)
  total: number;
  serviceCategory: 'EXECUTIVE_PROTECTION' | 'STATIC_POST' | 'ARMORED_CONVOY' | 'SURVEILLANCE_COUNTERMEASURES' | 'K9_UNIT' | 'SURCHARGE';
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. LSF-INV-2026-0891
  clientId: string;
  clientName: string;
  clientOrganization: string;
  clientEmail: string;
  billingAddress: string;
  status: InvoiceStatus;
  issueDate: string; // ISO date
  dueDate: string;   // ISO date
  paidDate?: string;
  currency: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxTotal: number;
  discount: number;
  totalAmount: number;
  notes?: string;
  paymentTerms: 'NET_15' | 'NET_30' | 'DUE_ON_RECEIPT';
  wireInstructions?: {
    beneficiary: string;
    bankName: string;
    routingNumber: string;
    swiftBic: string;
    escrowReference: string;
  };
}

export interface PaymentTransaction {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethodType;
  status: 'SUCCESS' | 'PROCESSING' | 'FAILED';
  timestamp: string;
  receiptNumber: string;
}
