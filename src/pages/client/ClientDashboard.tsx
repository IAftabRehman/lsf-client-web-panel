import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/widgets/Badge';
import {
  Shield,
  MapPin,
  Car,
  AlertTriangle,
  Clock,
  Radio,
  FileText,
  CreditCard,
  Phone,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addNotification } = useAppStore();
  const [sosSent, setSosSent] = useState(false);

  const handleSos = () => {
    setSosSent(true);
    addNotification({
      title: 'Emergency Alert Sent',
      message: 'Priority emergency signal sent to command team. Armed support is en route to your location.',
      type: 'ALERT',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Client Portal
            </span>
            <Badge variant="secure" size="sm">Active Protection</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal font-sans">
            Welcome, {user?.name || 'Elena Rostova'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {user?.organization || 'Aegis Holdings International'} • Contract #LSF-CTR-2026-904
          </p>
        </div>

        {/* Emergency SOS Button */}
        <div>
          <button
            type="button"
            onClick={handleSos}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-sm ${
              sosSent
                ? 'bg-amber-600 text-white'
                : 'bg-red-600 text-white hover:bg-red-500'
            }`}
          >
            <AlertTriangle size={16} />
            {sosSent ? 'Emergency Alert Sent' : 'Emergency Assistance SOS'}
          </button>
        </div>
      </div>

      {/* 3 Main Summary Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Assigned Protection Officer */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Lead Protection Officer
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield size={16} />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <div className="w-11 h-11 rounded-md bg-gray-800 border border-gray-700 flex items-center justify-center text-emerald-400 font-bold text-base">
                AC
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Alexander Cruz</h3>
                <p className="text-xs text-emerald-400 font-medium">Callsign: Vanguard-1</p>
                <p className="text-xs text-gray-400">Senior Protection Specialist</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Radio size={13} className="text-emerald-400" /> Channel 4 Connected
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-200 bg-gray-800 rounded border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Phone size={12} /> Call Officer
            </button>
          </div>
        </div>

        {/* Column 2: Convoy & Vehicle Tracking */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Convoy & Vehicle Detail
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Car size={16} />
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Current Station:</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <MapPin size={12} className="text-cyan-400" /> Financial District Penthouse
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Vehicle Type:</span>
                <span className="text-white font-medium">2x Armored Suburbans (B6)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Next Departure:</span>
                <span className="text-cyan-400 font-medium">14:30 UTC (Airport Transit)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-cyan-400" /> ETA to Airport: 22 Mins
            </span>
            <span className="text-emerald-400 font-medium">Route Cleared</span>
          </div>
        </div>

        {/* Column 3: Invoices & Payment Summary */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-amber-500/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-300 uppercase tracking-wide">
                Invoice & Payment Status
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <CreditCard size={16} />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xs text-gray-400">Pending Amount Due:</span>
              <div className="text-3xl font-bold text-amber-400 mt-0.5">
                {formatCurrency(52501.25)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Invoice #LSF-INV-2026-0891 (Due: Sept 1, 2026)
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between">
            <span className="text-xs text-amber-400 font-medium">Payment Pending</span>
            <button
              type="button"
              onClick={() => navigate('/client/invoices')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-black bg-amber-400 rounded hover:bg-amber-300 transition-colors shadow-sm"
            >
              Pay Now <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 2 Balanced Columns at the Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Security Directives */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white">
                Active Security Directives
              </h2>
              <p className="text-xs text-gray-400">Current protocols active at your location</p>
            </div>
            <span className="text-xs font-medium text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30">
              Patrol Active
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              '24/7 armed perimeter monitoring with synchronized thermal cameras.',
              '100% ID check on all visitors with pre-cleared access authorization.',
              'Backup evacuation vehicle stationed on standby at Gate 1.',
              'Continuous radio and sensor sweeps for unauthorized drones or surveillance.',
            ].map((directive, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-md bg-gray-950/60 border border-gray-800/80 text-xs text-gray-200"
              >
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{directive}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Master Service Agreement */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white">
                Contract & Protection Agreement
              </h2>
              <p className="text-xs text-gray-400">Master Service Agreement summary</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/client/contracts')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
            >
              View Full Terms <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-md bg-gray-950/60 border border-gray-800/80">
              <span className="text-gray-400">Agreement Reference:</span>
              <span className="font-semibold text-white">LSF-CTR-2026-904</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-gray-950/60 border border-gray-800/80">
              <span className="text-gray-400">Monthly Retainer:</span>
              <span className="font-semibold text-emerald-400">{formatCurrency(45000)} / month</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-gray-950/60 border border-gray-800/80">
              <span className="text-gray-400">Liability Coverage Cap:</span>
              <span className="font-semibold text-white">$10,000,000.00 USD</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-gray-950/60 border border-gray-800/80">
              <span className="text-gray-400">Confidentiality / NDA:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <FileText size={13} /> Signed & Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
