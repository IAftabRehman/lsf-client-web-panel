import React, { useState } from 'react';
import { MOCK_POST_ORDERS, MOCK_GUARDS } from '@/services/mockData';
import { PostOrder, GuardDeployment } from '@/types/security.types';
import { Badge } from '@/components/widgets/Badge';
import { DataTable, Column } from '@/components/widgets/DataTable';
import { useAppStore } from '@/store/useAppStore';
import {
  MapPin,
  Users,
  Plus,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
} from 'lucide-react';

export const PostOrdersGuardDeployment: React.FC = () => {
  const { addNotification } = useAppStore();
  const [postOrders, setPostOrders] = useState<PostOrder[]>(MOCK_POST_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<PostOrder>(MOCK_POST_ORDERS[0]);
  const [guards] = useState<GuardDeployment[]>(MOCK_GUARDS);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newDirective, setNewDirective] = useState('');

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName) return;

    const newOrder: PostOrder = {
      id: `po-${Date.now()}`,
      orderNumber: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
      siteName: newSiteName,
      threatLevel: 'NORMAL',
      effectiveDate: new Date().toISOString().split('T')[0],
      primaryDirectives: [newDirective || 'Maintain strict access control and 24/7 patrol telemetry.'],
      restrictedZones: ['Main Entry', 'Control Server Room'],
      emergencyContactProtocol: 'Encrypted Radio Channel 4 to Operations Center',
      authorizedVisitorList: ['Standard Cleared Personnel'],
      assignedOfficersCount: 4,
      status: 'ACTIVE',
    };

    setPostOrders([newOrder, ...postOrders]);
    setSelectedOrder(newOrder);
    setShowNewOrderModal(false);
    setNewSiteName('');
    setNewDirective('');

    addNotification({
      title: `Post Order Activated`,
      message: `Deployed security directives for ${newOrder.siteName}.`,
      type: 'SUCCESS',
    });
  };

  const columns: Column<GuardDeployment>[] = [
    {
      key: 'callsign',
      header: 'Guard / Callsign',
      render: (guard) => (
        <div className="flex flex-col py-0.5">
          <span className="font-semibold text-white flex items-center gap-1.5 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {guard.callsign}
          </span>
          <span className="text-xs text-slate-400">
            {guard.fullName} • {guard.badgeNumber}
          </span>
        </div>
      ),
    },
    {
      key: 'assignedSite',
      header: 'Assigned Post Station',
      render: (guard) => (
        <span className="text-slate-200 text-xs flex items-center gap-1">
          <MapPin size={12} className="text-emerald-400 shrink-0" /> {guard.assignedSite}
        </span>
      ),
    },
    {
      key: 'shiftStart',
      header: 'Shift Hours',
      render: (guard) => (
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock size={12} /> {guard.shiftStart} - {guard.shiftEnd}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Duty Status',
      align: 'right',
      render: (guard) => (
        <Badge variant={guard.status === 'ACTIVE' ? 'secure' : 'cyan'} size="sm">
          {guard.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Security Operations
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium">
              4 Sites Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Post Orders & Guard Deployment
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage site-specific security directives, restricted zones, and personnel shift assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewOrderModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Create Post Order
        </button>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Post Order (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Site Selector Tabs in Column Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {postOrders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedOrder(order)}
                className={`px-4 py-2.5 rounded-lg border text-left transition-all ${
                  selectedOrder.id === order.id
                    ? 'bg-slate-800 border-emerald-500 text-white font-semibold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-sm">{order.orderNumber}</div>
                <div className="text-xs text-slate-400 truncate max-w-[200px]">{order.siteName}</div>
              </button>
            ))}
          </div>

          {/* Post Order Details Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-700/80">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {selectedOrder.siteName}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Order Reference: {selectedOrder.orderNumber} • Effective: {selectedOrder.effectiveDate}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Badge variant={selectedOrder.threatLevel === 'NORMAL' ? 'secure' : 'alert'} size="sm">
                  Threat: {selectedOrder.threatLevel}
                </Badge>
              </div>
            </div>

            {/* Directives Section */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide block">
                Standing Security Directives
              </span>
              <div className="space-y-2">
                {selectedOrder.primaryDirectives.map((directive, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-start gap-3 text-sm text-slate-200"
                  >
                    <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{directive}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Balanced Mini-Columns: Restricted Zones & Assigned Guards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-700/80">
                <span className="text-xs font-medium text-slate-400 block uppercase">
                  Restricted Areas
                </span>
                <div className="text-white text-sm font-semibold mt-1">
                  {selectedOrder.restrictedZones.join(', ')}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-700/80">
                <span className="text-xs font-medium text-slate-400 block uppercase">
                  Guards on Duty
                </span>
                <div className="text-emerald-400 text-sm font-semibold mt-1 flex items-center gap-1.5">
                  <Users size={16} />
                  {selectedOrder.assignedOfficersCount} Officers Stationed
                </div>
              </div>
            </div>

            {/* Emergency Escalation Protocol */}
            <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-500/40 text-xs space-y-1">
              <div className="font-semibold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle size={15} /> Emergency Escalation Protocol
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mt-1">
                {selectedOrder.emergencyContactProtocol}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Assigned Guard Roster (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-emerald-400" />
              Assigned Guard Roster
            </h2>
            <span className="text-xs text-slate-400">4 Guards On Duty</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card">
            <DataTable
              columns={columns}
              data={guards}
              searchKey="callsign"
              searchPlaceholder="Filter guard callsign or name..."
              pageSize={4}
            />
          </div>
        </div>
      </div>

      {/* Clean Modal Dialog for Creating Post Order */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">Create New Post Order</h3>
              <button
                type="button"
                onClick={() => setShowNewOrderModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Site / Sector Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sovereign Vault Perimeter Bravo"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Primary Standing Security Directive
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Enforce 100% identification checks at Gate 1."
                  value={newDirective}
                  onChange={(e) => setNewDirective(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm"
                >
                  Publish Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostOrdersGuardDeployment;
