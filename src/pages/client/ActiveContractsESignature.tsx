import React, { useState } from 'react';
import { MOCK_CONTRACTS } from '@/services/mockData';
import { Contract } from '@/types/contract.types';
import { Badge } from '@/components/widgets/Badge';
import { formatCurrency } from '@/utils/cn';
import { useAppStore } from '@/store/useAppStore';
import {
  FileSignature,
  CheckCircle,
  Lock,
  Download,
} from 'lucide-react';

export const ActiveContractsESignature: React.FC = () => {
  const { addNotification } = useAppStore();
  const [contract, setContract] = useState<Contract>(MOCK_CONTRACTS[0]);
  const [hasAgreedTerms, setHasAgreedTerms] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [signedState, setSignedState] = useState(contract.eSignatureStatus.clientSigned);

  const handleExecuteSignature = async () => {
    setIsSigning(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSignedState(true);
    setContract((prev) => ({
      ...prev,
      eSignatureStatus: {
        ...prev.eSignatureStatus,
        clientSigned: true,
        clientSignedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        ipAuditTrail: '198.51.100.42 (DocuSign Verified)',
      },
    }));

    setIsSigning(false);
    addNotification({
      title: 'Contract Electronically Signed',
      message: `${contract.contractCode} digitally countersigned and recorded.`,
      type: 'SUCCESS',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Contract Agreement
            </span>
            <Badge variant="secure" size="sm">DocuSign Verified</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Active Contracts & Electronic Signature
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review service agreements, protection rules of engagement, and execute digital signatures.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            addNotification({
              title: 'Contract Downloaded',
              message: 'Full PDF agreement downloaded.',
              type: 'INFO',
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* 4 Clean Columns of Contract Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card">
          <span className="text-xs text-slate-400 uppercase font-medium">Contract Code</span>
          <div className="text-base font-bold text-white mt-1">
            {contract.contractCode}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Valid through Dec 31, 2026</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card">
          <span className="text-xs text-slate-400 uppercase font-medium">Monthly Retainer</span>
          <div className="text-base font-bold text-emerald-400 mt-1">
            {formatCurrency(contract.monthlyRetainer)}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Total Value: {formatCurrency(contract.totalContractValue)}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card">
          <span className="text-xs text-slate-400 uppercase font-medium">Liability Insurance</span>
          <div className="text-base font-bold text-white mt-1">
            $10,000,000.00 USD
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Full Comprehensive Coverage</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card">
          <span className="text-xs text-slate-400 uppercase font-medium">Signature Status</span>
          <div className="mt-1">
            <Badge variant={signedState ? 'secure' : 'alert'} size="sm">
              {signedState ? 'Fully Executed' : 'Awaiting Signature'}
            </Badge>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Signed by Both Parties</span>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clauses (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-4">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              {contract.title}
            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {contract.clauses.map((clause) => (
                <div
                  key={clause.id}
                  className="p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400">
                      Section {clause.section} — {clause.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {clause.isMandatory ? 'Mandatory' : 'Standard SLA'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {clause.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Signature Seal (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-4">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              Electronic Signature Seal
            </h2>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Signatory:</span>
                <span className="text-white font-semibold">Elena Rostova</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Title:</span>
                <span className="text-white">Chief Executive Officer</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Envelope ID:</span>
                <span className="text-slate-300">DS-9801-B782-99F12</span>
              </div>
            </div>

            {signedState ? (
              <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle size={18} /> Signed & Recorded
                </div>
                <p className="text-xs text-slate-300">
                  {contract.eSignatureStatus.clientSignedAt}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 h-28 flex items-center justify-center text-xs text-slate-400 italic">
                  [ Digital Signature Placeholder ]
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreedTerms}
                    onChange={(e) => setHasAgreedTerms(e.target.checked)}
                    className="rounded border-slate-600 bg-slate-900 text-emerald-400 focus:ring-emerald-400"
                  />
                  <span>I agree to electronic signature legally binding execution.</span>
                </label>

                <button
                  type="button"
                  disabled={!hasAgreedTerms || isSigning}
                  onClick={handleExecuteSignature}
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-40"
                >
                  <FileSignature size={16} />
                  {isSigning ? 'Signing Contract...' : 'Sign Agreement Now'}
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-emerald-400" /> 2048-Bit RSA
              </span>
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveContractsESignature;
