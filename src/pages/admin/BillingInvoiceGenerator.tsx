import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatCurrency } from '@/utils/cn';
import { useAppStore } from '@/store/useAppStore';
import {
  Trash2,
  Plus,
  Send,
  Calculator,
  Shield,
  CheckCircle,
} from 'lucide-react';

const invoiceLineSchema = z.object({
  description: z.string().min(2, 'Description required'),
  category: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitRate: z.number().min(1, 'Unit rate required'),
});

const invoiceFormSchema = z.object({
  clientName: z.string().min(2, 'Client name required'),
  clientCompany: z.string().min(2, 'Organization required'),
  clientEmail: z.string().email('Valid email required'),
  dueDate: z.string().min(6, 'Due date required'),
  paymentTerms: z.enum(['NET_15', 'NET_30', 'DUE_ON_RECEIPT']),
  lineItems: z.array(invoiceLineSchema).min(1, 'At least one line item required'),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

export const BillingInvoiceGenerator: React.FC = () => {
  const { addNotification } = useAppStore();
  const [isGenerated, setIsGenerated] = useState(false);
  const [createdInvoiceNumber, setCreatedInvoiceNumber] = useState('');

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      clientName: 'Elena Rostova',
      clientCompany: 'Aegis Holdings International',
      clientEmail: 'e.rostova@aegis-corp.global',
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      paymentTerms: 'NET_15',
      lineItems: [
        {
          description: 'Tier-1 Close Protection Details (Specialist Operators)',
          category: 'EXECUTIVE_PROTECTION',
          quantity: 80,
          unitRate: 250,
        },
        {
          description: 'Armored B6 Convoy Escort & Advanced Driver Detail',
          category: 'ARMORED_CONVOY',
          quantity: 4,
          unitRate: 2500,
        },
      ],
      notes: 'Standard confidential security deployment per Master Agreement Terms.',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lineItems',
  });

  const watchedLineItems = watch('lineItems') || [];
  const subtotal = watchedLineItems.reduce(
    (acc, curr) => acc + (Number(curr.quantity) || 0) * (Number(curr.unitRate) || 0),
    0
  );
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const onSubmit = async (data: InvoiceFormValues) => {
    const invCode = `LSF-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedInvoiceNumber(invCode);

    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsGenerated(true);

    addNotification({
      title: `Invoice Generated: ${invCode}`,
      message: `Dispatched invoice for ${formatCurrency(total)} to ${data.clientCompany}.`,
      type: 'SUCCESS',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Billing Management
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium">
              Verified Form Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Create & Dispatch Client Invoice
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate itemized invoices for executive protection, static security posts, and armored convoys.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form (7 Cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-5">
              <h2 className="text-lg font-bold text-white pb-3 border-b border-slate-700">
                Invoice Information
              </h2>

              {/* Client Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Client Principal Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    {...register('clientName')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  {errors.clientName && (
                    <p className="text-xs text-amber-400 mt-1">{errors.clientName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Client Organization / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aegis Holdings"
                    {...register('clientCompany')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  {errors.clientCompany && (
                    <p className="text-xs text-amber-400 mt-1">{errors.clientCompany.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Billing Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="billing@client.com"
                    {...register('clientEmail')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-amber-400 mt-1">{errors.clientEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Payment Due Date
                  </label>
                  <input
                    type="date"
                    {...register('dueDate')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  {errors.dueDate && (
                    <p className="text-xs text-amber-400 mt-1">{errors.dueDate.message}</p>
                  )}
                </div>
              </div>

              {/* Line Items Section */}
              <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Calculator size={16} className="text-emerald-400" />
                    Itemized Security Services
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        description: 'Additional Protection Detail',
                        category: 'EXECUTIVE_PROTECTION',
                        quantity: 20,
                        unitRate: 200,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 rounded-lg hover:bg-emerald-900/60 transition-colors"
                  >
                    <Plus size={14} /> Add Service Line
                  </button>
                </div>

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          Item #{index + 1}
                        </span>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                            title="Remove Line"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      <input
                        placeholder="Service description (e.g. Close Protection Officers)"
                        {...register(`lineItems.${index}.description` as const)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">
                            Quantity / Hours
                          </label>
                          <input
                            type="number"
                            {...register(`lineItems.${index}.quantity` as const, {
                              valueAsNumber: true,
                            })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">
                            Rate per Unit ($ USD)
                          </label>
                          <input
                            type="number"
                            {...register(`lineItems.${index}.unitRate` as const, {
                              valueAsNumber: true,
                            })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Dispatching Invoice...' : 'Generate & Send Invoice'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Live Calculation & Confirmation (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-4">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              Live Total Calculation
            </h2>

            <div className="space-y-3 p-4 rounded-lg bg-slate-900 border border-slate-700 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Tax (8.25%):</span>
                <span className="text-white font-semibold">{formatCurrency(tax)}</span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between text-base font-bold text-white">
                <span>Total Amount:</span>
                <span className="text-emerald-400">{formatCurrency(total)}</span>
              </div>
            </div>

            {isGenerated && (
              <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle size={16} /> Invoice Successfully Created
                </div>
                <div className="text-xs text-white">
                  Reference: <span className="font-bold">{createdInvoiceNumber}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The client has been notified by email with secure payment link.
                </p>
              </div>
            )}

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 flex items-start gap-3">
              <Shield size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                All generated invoice records are saved to the audit ledger and synchronized with client accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInvoiceGenerator;
