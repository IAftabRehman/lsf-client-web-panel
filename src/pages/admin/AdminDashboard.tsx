import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { MOCK_GUARDS, MOCK_INCIDENTS } from '@/services/mockData';
import { GuardDeployment, ThreatLevel } from '@/types/security.types';
import { Badge } from '@/components/widgets/Badge';
import { DataTable, Column } from '@/components/widgets/DataTable';
import {
  Shield,
  Users,
  DollarSign,
  AlertCircle,
  Radio,
  Plus,
  Send,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { threatLevel, setThreatLevel, addNotification } = useAppStore();
  const [guards] = useState<GuardDeployment[]>(MOCK_GUARDS);
  const [incidents] = useState(MOCK_INCIDENTS);

  const handleThreatChange = (level: ThreatLevel) => {
    setThreatLevel(level);
    addNotification({
      title: `Threat Level Updated: ${level}`,
      message: `System operational threat condition has been set to ${level}.`,
      type: level === 'CRITICAL' || level === 'HIGH' ? 'ALERT' : 'INFO',
    });
  };

  const handleDispatchQrf = () => {
    addNotification({
      title: 'Support Unit Dispatched',
      message: 'Mobile tactical support team has been dispatched to Sector 4A.',
      type: 'ALERT',
    });
  };

  const columns: Column<GuardDeployment>[] = [
    {
      key: 'callsign',
      header: 'Guard / Operator',
      sortable: true,
      render: (guard) => (
        <div className="flex flex-col py-0.5">
          <span className="font-semibold text-white flex items-center gap-1.5 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {guard.callsign}
          </span>
          <span className="text-xs text-gray-400">
            {guard.fullName} • {guard.badgeNumber}
          </span>
        </div>
      ),
    },
    {
      key: 'rank',
      header: 'Role',
      render: (guard) => (
        <span className="text-xs text-gray-300 font-medium">
          {guard.rank.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'assignedSite',
      header: 'Assigned Location',
      sortable: true,
      render: (guard) => (
        <div className="flex flex-col py-0.5">
          <span className="text-white text-xs font-medium">{guard.assignedSite}</span>
          <span className="text-[11px] text-gray-400">{guard.postLocation}</span>
        </div>
      ),
    },
    {
      key: 'biometricHeartRate',
      header: 'Heart Rate',
      sortable: true,
      align: 'center',
      render: (guard) => (
        <div className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-black/40 border border-white/5">
          <Heart
            size={13}
            className={guard.biometricHeartRate > 90 ? 'text-amber-400' : 'text-emerald-400'}
          />
          <span className={guard.biometricHeartRate > 90 ? 'text-amber-400' : 'text-gray-200'}>
            {guard.biometricHeartRate} BPM
          </span>
        </div>
      ),
    },
    {
      key: 'radioFrequencyMhz',
      header: 'Radio Channel',
      render: (guard) => (
        <span className="text-xs text-cyan-400 flex items-center gap-1">
          <Radio size={13} /> {guard.radioFrequencyMhz} MHz
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'right',
      render: (guard) => (
        <Badge
          variant={
            guard.status === 'ENGAGED'
              ? 'alert'
              : guard.status === 'ACTIVE'
              ? 'secure'
              : 'cyan'
          }
          size="sm"
        >
          {guard.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-normal font-sans">
            Security Management Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Overview of active guards, current threat levels, billing summaries, and incident reports.
          </p>
        </div>

        {/* Clean Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/invoices')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-200 bg-gray-900 border border-gray-700 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
          >
            <DollarSign size={15} />
            Invoices & Billing
          </button>

          <button
            type="button"
            onClick={handleDispatchQrf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-500/50 rounded-md hover:bg-amber-900/50 transition-colors"
          >
            <Send size={15} />
            Dispatch Support
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/post-orders')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-black bg-emerald-400 border border-emerald-400 rounded-md hover:bg-emerald-300 transition-colors shadow-sm"
          >
            <Plus size={15} />
            New Post Order
          </button>
        </div>
      </div>

      {/* 4 Clean Metric Cards in Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Active Guards on Duty
            </span>
            <div className="w-8 h-8 rounded-md bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">18</span>
            <span className="text-sm text-gray-400 font-normal">/ 20 guards active</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
            <span>Standby Guards: 2</span>
            <span className="text-emerald-400 font-medium">Full Coverage</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Security Threat Level
            </span>
            <div className="w-8 h-8 rounded-md bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300">
              <Shield size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-2xl font-bold ${threatLevel === 'NORMAL' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {threatLevel}
            </span>
            <div className="flex items-center gap-1">
              {(['NORMAL', 'ELEVATED', 'CRITICAL'] as ThreatLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleThreatChange(level)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    threatLevel === level
                      ? 'bg-emerald-400 text-black'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {level[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/80 text-xs text-gray-400">
            All posts reporting normal status
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Monthly Billed Revenue
            </span>
            <div className="w-8 h-8 rounded-md bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {formatCurrency(348250)}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
            <span>Active Contracts: 3</span>
            <span className="text-emerald-400 font-medium">+14.2% this month</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-lg bg-gray-900/90 border border-amber-500/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-300 uppercase tracking-wide">
              Pending Invoice
            </span>
            <div className="w-8 h-8 rounded-md bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">
              {formatCurrency(52501.25)}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
            <span className="text-gray-400">Elena Rostova</span>
            <button
              onClick={() => navigate('/admin/invoices')}
              className="text-amber-300 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              View Invoice <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Left Column (Table) + Right Column (Alerts Feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Guard Deployments Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-lg font-bold text-white font-sans">
              Active Guard Deployments
            </h2>
            <span className="text-xs text-gray-400">
              Real-time shift and location tracking
            </span>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-lg p-4 shadow-sm">
            <DataTable
              columns={columns}
              data={guards}
              searchKey="callsign"
              searchPlaceholder="Filter by callsign, name or location..."
              pageSize={4}
            />
          </div>
        </div>

        {/* Right Column: Security Alerts & Incident Stream (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-lg font-bold text-white font-sans">
              Recent Activity & Incidents
            </h2>
            <span className="text-xs text-emerald-400 font-medium">Live Feed</span>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-lg p-4 shadow-sm space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="p-3.5 rounded-md bg-gray-950/70 border border-gray-800 space-y-1.5 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold ${
                      incident.severity === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {incident.location}
                  </span>
                  <span className="text-gray-400 text-[11px]">
                    {incident.timestamp.substring(11, 16)} UTC
                  </span>
                </div>

                <div className="text-sm font-medium text-white">
                  {incident.title}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {incident.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-800/60 text-gray-400">
                  <span>Officer: {incident.acknowledgedBy}</span>
                  <span className={incident.resolved ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                    {incident.resolved ? '✓ Resolved' : 'Pending Action'}
                  </span>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-md bg-gray-950 border border-gray-800/80 text-center">
              <span className="text-xs text-gray-400">
                All sensor gates and optical cameras active with zero errors.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
