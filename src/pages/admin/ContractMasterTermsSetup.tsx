import React, { useState } from 'react';
import { Badge } from '@/components/widgets/Badge';
import { ToggleSwitch } from '@/components/widgets/ToggleSwitch';
import { useAppStore } from '@/store/useAppStore';
import {
  Save,
  DollarSign,
  Plus,
} from 'lucide-react';

export const ContractMasterTermsSetup: React.FC = () => {
  const { addNotification } = useAppStore();
  const [cpoRate, setCpoRate] = useState(250);
  const [driverRate, setDriverRate] = useState(200);
  const [hazardMultiplier, setHazardMultiplier] = useState(1.5);
  const [armedEscortMandatory, setArmedEscortMandatory] = useState(true);
  const [perpetualNda, setPerpetualNda] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveTerms = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);

    addNotification({
      title: 'Contract Terms Saved',
      message: 'Global hourly billing rates and standard clauses updated.',
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
              Contract Setup
            </span>
            <Badge variant="secure" size="sm">Template Active</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Contract Master & Rate Cards
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure hourly rates for guards, high-risk multipliers, and standard contract clauses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveTerms}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Save size={16} />
          {isSaving ? 'Saving Changes...' : 'Save Rate Cards'}
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Hourly Rates */}
        <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-5">
          <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
            Standard Hourly Rates ($ USD)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Senior Close Protection Officer (Hourly Rate)
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  value={cpoRate}
                  onChange={(e) => setCpoRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Armored Convoy Tactical Driver (Hourly Rate)
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  value={driverRate}
                  onChange={(e) => setDriverRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Elevated Threat Multiplier
              </label>
              <input
                type="number"
                step="0.1"
                value={hazardMultiplier}
                onChange={(e) => setHazardMultiplier(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Applied automatically when threat condition escalates.
              </span>
            </div>

            <div className="pt-3 border-t border-slate-700 space-y-3">
              <ToggleSwitch
                checked={armedEscortMandatory}
                onChange={setArmedEscortMandatory}
                label="Require Armed Concealed Escort"
                description="All assigned officers carry verified state permits"
                variant="neon-green"
              />

              <ToggleSwitch
                checked={perpetualNda}
                onChange={setPerpetualNda}
                label="Standard Non-Disclosure Agreement (NDA)"
                description="Enforce confidentiality across all deployments"
                variant="neon-green"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Standard Clauses */}
        <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h2 className="text-base font-bold text-white">
              Standard Contract Clauses
            </h2>
            <button
              type="button"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
            >
              <Plus size={14} /> Add Clause
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Clause 1: Rules of Engagement</span>
                <span className="text-xs text-emerald-400 font-medium">Mandatory</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Officers strictly follow standard de-escalation protocols and proportional defense standards.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Clause 2: Emergency Response Guarantee</span>
                <span className="text-xs text-slate-300">Standard SLA</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Guaranteed 15-minute emergency evacuation vehicle stationing for principal accounts.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Clause 3: Confidentiality Policy</span>
                <span className="text-xs text-emerald-400 font-medium">Mandatory</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Client travel itineraries and physical movements remain strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractMasterTermsSetup;
