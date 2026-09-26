import React, { useState } from 'react';
import { Badge } from '@/components/widgets/Badge';
import { formatCurrency } from '@/utils/cn';
import {
  Mail,
  Phone,
  Shield,
  MapPin,
  Plus,
} from 'lucide-react';

interface ClientCRMItem {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  activeContract: string;
  monthlyValue: number;
  assignedTeam: string;
  protectedAssets: string[];
}

const MOCK_CRM_CLIENTS: ClientCRMItem[] = [
  {
    id: 'cli-1',
    name: 'Elena Rostova',
    organization: 'Aegis Holdings International',
    email: 'e.rostova@aegis-corp.global',
    phone: '+1 (555) 234-8890',
    riskRating: 'HIGH',
    activeContract: 'LSF-CTR-2026-904',
    monthlyValue: 45000,
    assignedTeam: 'Tactical Team Alpha (Lead: Alexander Cruz)',
    protectedAssets: ['Financial District HQ', '2x Armored Suburbans', 'Executive Residence'],
  },
  {
    id: 'cli-2',
    name: 'Julian Sterling',
    organization: 'Sterling Biotech Labs',
    email: 'j.sterling@sterling-bio.com',
    phone: '+1 (555) 890-1122',
    riskRating: 'MEDIUM',
    activeContract: 'LSF-CTR-2026-881',
    monthlyValue: 82000,
    assignedTeam: 'Static Post Unit 2',
    protectedAssets: ['BSL-4 Research Facility', 'Cold Storage Cryo Vault'],
  },
  {
    id: 'cli-3',
    name: 'Victor Zhao',
    organization: 'Apex Quantum Technologies',
    email: 'v.zhao@apex-quantum.io',
    phone: '+1 (555) 345-6711',
    riskRating: 'LOW',
    activeContract: 'LSF-CTR-2026-750',
    monthlyValue: 115000,
    assignedTeam: 'Perimeter Defense Team 1',
    protectedAssets: ['Data Fortress Austin', 'Executive Convoy Unit'],
  },
];

export const Client360CRM: React.FC = () => {
  const [clients] = useState<ClientCRMItem[]>(MOCK_CRM_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<ClientCRMItem>(MOCK_CRM_CLIENTS[0]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Client Management
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium">
              3 Corporate Accounts
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Client 360° Profile & CRM
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage principal accounts, assigned security details, and protected property assets.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Add New Client
        </button>
      </div>

      {/* 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Client List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Select Client Account
          </span>

          <div className="space-y-3">
            {clients.map((client) => {
              const isSelected = selectedClient.id === client.id;
              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">
                      {client.name}
                    </span>
                    <Badge
                      variant={
                        client.riskRating === 'HIGH'
                          ? 'alert'
                          : client.riskRating === 'MEDIUM'
                          ? 'cyan'
                          : 'secure'
                      }
                      size="sm"
                    >
                      {client.riskRating} Risk
                    </Badge>
                  </div>

                  <div className="text-xs text-emerald-400 font-medium mt-0.5">
                    {client.organization}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Retainer: {formatCurrency(client.monthlyValue)}/mo</span>
                    <span className="text-slate-200 font-medium">{client.activeContract}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 360 Detail Dossier (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-700">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {selectedClient.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedClient.organization}</p>
              </div>
              <Badge
                variant={selectedClient.riskRating === 'HIGH' ? 'alert' : 'secure'}
                size="sm"
              >
                {selectedClient.riskRating} Risk Profile
              </Badge>
            </div>

            {/* Contact Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-slate-900 border border-slate-700 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px] uppercase">Email Address</span>
                <span className="text-white flex items-center gap-1.5 font-medium">
                  <Mail size={13} className="text-emerald-400" /> {selectedClient.email}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px] uppercase">Direct Phone</span>
                <span className="text-white flex items-center gap-1.5 font-medium">
                  <Phone size={13} className="text-emerald-400" /> {selectedClient.phone}
                </span>
              </div>
            </div>

            {/* Assigned Protection Team */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide block">
                Assigned Security Detail
              </span>
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" />
                  <span className="font-semibold text-white">{selectedClient.assignedTeam}</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">Active Deployment</span>
              </div>
            </div>

            {/* Protected Assets List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide block">
                Registered Protected Assets
              </span>
              <div className="space-y-2">
                {selectedClient.protectedAssets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-200 flex items-center gap-2 font-medium">
                      <MapPin size={13} className="text-cyan-400" /> {asset}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">24/7 Monitored</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Active Contract</span>
                <span className="text-white font-bold">{selectedClient.activeContract}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px] uppercase">Monthly Retainer</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {formatCurrency(selectedClient.monthlyValue)} / mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client360CRM;
