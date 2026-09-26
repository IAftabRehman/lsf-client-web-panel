import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import { ToggleSwitch } from '@/components/widgets/ToggleSwitch';
import { Badge } from '@/components/widgets/Badge';
import {
  Save,
  KeyRound,
} from 'lucide-react';

export const ClientProfileSettings: React.FC = () => {
  const { user, toggleTwoFactor } = useAuthStore();
  const { addNotification } = useAppStore();

  const [name, setName] = useState(user?.name || 'Elena Rostova');
  const [email, setEmail] = useState(user?.email || 'e.rostova@aegis-corp.global');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8890');
  const [hardwareKey, setHardwareKey] = useState(true);
  const [panicActive, setPanicActive] = useState(true);
  const [autoPurgeVitals, setAutoPurgeVitals] = useState(true);
  const [convoyAlerts, setConvoyAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);

    addNotification({
      title: 'Settings Saved',
      message: 'Your profile and authentication preferences have been updated.',
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
              Account Management
            </span>
            <Badge variant="secure" size="sm">Verified Account</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
            Profile & Security Preferences
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage contact details, two-factor authentication, and emergency alert channels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Save size={16} />
          {isSaving ? 'Saving Changes...' : 'Save Settings'}
        </button>
      </div>

      {/* 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Personal Info & Data Privacy */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-4">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              Personal Information
            </h2>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Direct Emergency Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-400 flex items-center justify-between">
                <span>Account Identifier:</span>
                <span className="text-white font-semibold">{user?.badgeNumber || 'VIP-CLI-7721'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-3">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              Data Retention & Privacy
            </h2>
            <ToggleSwitch
              checked={autoPurgeVitals}
              onChange={setAutoPurgeVitals}
              label="30-Day Data Purge for Medical & GPS Records"
              description="Automatically delete travel logs and telemetry after 30 days"
              variant="cyan"
            />
          </div>
        </div>

        {/* Right Column: Security & Notifications */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-4">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              Security & Two-Factor Authentication
            </h2>

            <div className="space-y-4">
              <ToggleSwitch
                checked={user?.twoFactorEnabled ?? true}
                onChange={toggleTwoFactor}
                label="Two-Factor Authentication (2FA)"
                description="Require rolling 6-digit code during sign in"
                variant="neon-green"
              />

              <ToggleSwitch
                checked={hardwareKey}
                onChange={setHardwareKey}
                label="Physical Security Key (FIDO2 / YubiKey)"
                description="Require physical USB hardware key challenge"
                variant="neon-orange"
              />

              <ToggleSwitch
                checked={panicActive}
                onChange={setPanicActive}
                label="Emergency SOS One-Touch Button"
                description="Enable instant tactical support dispatch button on dashboard"
                variant="neon-orange"
              />

              <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <KeyRound size={14} className="text-amber-400" />
                  Key Updated 14 days ago
                </span>
                <span className="text-emerald-400 font-medium">Secured</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-card space-y-3">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-700">
              Notification Preferences
            </h2>
            <ToggleSwitch
              checked={convoyAlerts}
              onChange={setConvoyAlerts}
              label="Convoy Departure & Arrival Alerts"
              description="Receive SMS notifications when transport vehicles are in motion"
              variant="neon-green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileSettings;
