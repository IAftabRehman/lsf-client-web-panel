import React, { useState } from 'react';
import { MOCK_INVOICES } from '@/services/mockData';
import { Invoice, InvoiceStatus } from '@/types/invoice.types';
import { Badge } from '@/components/widgets/Badge';
import { DataTable, Column } from '@/components/widgets/DataTable';
import { formatCurrency } from '@/utils/cn';
import { useAppStore } from '@/store/useAppStore';
import {
  CreditCard,
  Building,
  CheckCircle,
  Copy,
  Download,
  Shield,
  Calendar,
} from 'lucide-react';

export const InvoicesPaymentHub: React.FC = () => {
  const { addNotification } = useAppStore();
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(MOCK_INVOICES[0]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | InvoiceStatus>('ALL');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((inv) =>
    statusFilter === 'ALL' ? true : inv.status === statusFilter
  );

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulatePayment = async () => {
    if (!selectedInvoice) return;
    setIsProcessingPayment(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === selectedInvoice.id
          ? { ...inv, status: 'PAID', paidDate: new Date().toISOString().split('T')[0] }
          : inv
      )
    );

    setSelectedInvoice((prev) =>
      prev ? { ...prev, status: 'PAID', paidDate: new Date().toISOString().split('T')[0] } : null
    );

    setIsProcessingPayment(false);
    addNotification({
      title: `Payment Received: ${selectedInvoice.invoiceNumber}`,
      message: `${formatCurrency(selectedInvoice.totalAmount)} successfully processed.`,
      type: 'SUCCESS',
    });
  };

  const columns: Column<Invoice>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice Code',
      sortable: true,
      render: (inv) => (
        <span className="font-semibold text-white">
          {inv.invoiceNumber}
        </span>
      ),
    },
    {
      key: 'issueDate',
      header: 'Issue / Due Date',
      sortable: true,
      render: (inv) => (
        <div className="flex flex-col text-xs">
          <span className="text-white flex items-center gap-1 font-medium">
            <Calendar size={12} className="text-emerald-400" /> {inv.issueDate}
          </span>
          <span className="text-slate-400 text-[11px]">Due: {inv.dueDate}</span>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      sortable: true,
      render: (inv) => (
        <span className="font-bold text-white text-sm">
          {formatCurrency(inv.totalAmount)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Payment Status',
      align: 'right',
      render: (inv) => (
        <Badge
          variant={
            inv.status === 'PAID'
              ? 'secure'
              : inv.status === 'OVERDUE'
              ? 'alert'
              : 'cyan'
          }
          size="sm"
        >
          {inv.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Billing & Escrow
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium">
              SSL Secured
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Invoices & Payment Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review detailed security service charges, make online payments, or view bank transfer instructions.
          </p>
        </div>

        {/* Filter Pills in Column/Row */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs self-start sm:self-auto">
          {(['ALL', 'OVERDUE', 'PENDING', 'PAID'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                statusFilter === filter
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter === 'ALL' ? 'All Invoices' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Invoices Table (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card">
            <DataTable
              columns={columns}
              data={filteredInvoices}
              searchKey="invoiceNumber"
              searchPlaceholder="Search by invoice number..."
              onRowClick={(inv) => setSelectedInvoice(inv)}
              pageSize={5}
            />
          </div>

          {/* Escrow Guarantee Box */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-start gap-3 text-xs text-slate-300">
            <Shield size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              All payments are protected through our Tier-1 client escrow facility. Funds are allocated directly against verified officer shift and patrol hours.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Invoice View & Payment (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedInvoice ? (
            <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Invoice {selectedInvoice.invoiceNumber}
                  </h2>
                  <p className="text-xs text-slate-400">{selectedInvoice.clientOrganization}</p>
                </div>
                <Badge
                  variant={
                    selectedInvoice.status === 'PAID'
                      ? 'secure'
                      : selectedInvoice.status === 'OVERDUE'
                      ? 'alert'
                      : 'cyan'
                  }
                  size="sm"
                >
                  {selectedInvoice.status}
                </Badge>
              </div>

              {/* Meta Date Columns */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Issue Date</span>
                  <span className="text-white font-semibold">{selectedInvoice.issueDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Payment Due Date</span>
                  <span className="text-amber-400 font-semibold">{selectedInvoice.dueDate}</span>
                </div>
              </div>

              {/* Itemized Services */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide block">
                  Itemized Security Services
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {selectedInvoice.lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-700/60 flex items-start justify-between text-xs gap-3"
                    >
                      <div>
                        <div className="font-semibold text-white">{item.description}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.quantity} {item.unit} @ {formatCurrency(item.unitRate)} / unit
                        </div>
                      </div>
                      <div className="font-bold text-white shrink-0">
                        {formatCurrency(item.total)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-slate-200">{formatCurrency(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (8.25%):</span>
                  <span className="text-slate-200">{formatCurrency(selectedInvoice.taxTotal)}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Retainer Discount:</span>
                    <span>-{formatCurrency(selectedInvoice.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-700">
                  <span>Total Due:</span>
                  <span className="text-emerald-400 font-bold">
                    {formatCurrency(selectedInvoice.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Payment Actions */}
              {selectedInvoice.status !== 'PAID' ? (
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={handleSimulatePayment}
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CreditCard size={16} />
                    {isProcessingPayment
                      ? 'Processing Secure Payment...'
                      : `Pay Online (${formatCurrency(selectedInvoice.totalAmount)})`}
                  </button>

                  {/* Wire Instructions Box */}
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 text-xs space-y-2">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Building size={14} className="text-emerald-400" />
                      Bank Wire Transfer Details
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Beneficiary:</span>
                        <span className="text-white font-medium">LSF Defense Ops LLC</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Routing Number:</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('121000358', 'Routing Number')}
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                        >
                          121000358 <Copy size={11} />
                        </button>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">SWIFT / BIC:</span>
                        <span className="text-white font-medium">LSFUS33X</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Invoice Reference:</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedInvoice.invoiceNumber, 'Invoice Ref')}
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                        >
                          {selectedInvoice.invoiceNumber} <Copy size={11} />
                        </button>
                      </div>
                    </div>
                    {copiedField && (
                      <div className="text-[11px] text-emerald-400 text-center pt-1 font-medium">
                        ✓ Copied {copiedField} to clipboard
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle size={18} /> Invoice Paid in Full
                  </div>
                  <p className="text-xs text-slate-300">
                    Payment settled on {selectedInvoice.paidDate || 'Today'}.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      addNotification({
                        title: 'PDF Downloaded',
                        message: `Official receipt for ${selectedInvoice.invoiceNumber} downloaded.`,
                        type: 'INFO',
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-600 transition-colors"
                  >
                    <Download size={13} /> Download PDF Receipt
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-slate-800 rounded-xl border border-slate-700">
              Select an invoice from the table to view payment details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesPaymentHub;
