import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/widgets/Badge';
import {
  Menu,
  Bell,
  Clock,
  LogOut,
  Shield,
  User,
} from 'lucide-react';
import { useMilitaryClock } from '@/hooks/useMilitaryClock';

export const Header: React.FC = () => {
  const { user, setRole, logout } = useAuthStore();
  const {
    sidebarCollapsed,
    toggleSidebar,
    threatLevel,
    notifications,
  } = useAppStore();

  const utcTime = useMilitaryClock();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between font-sans">
      {/* Left: Sidebar Toggle + Clock + Threat */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <Menu size={18} />
        </button>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Clock size={14} className="text-emerald-400" />
          <span className="text-slate-100 font-medium">{utcTime}</span>
        </div>

        {/* Threat Level */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xs text-slate-400">Threat Level:</span>
          <Badge
            variant={
              threatLevel === 'CRITICAL' || threatLevel === 'HIGH'
                ? 'critical'
                : threatLevel === 'ELEVATED'
                ? 'alert'
                : 'secure'
            }
            size="sm"
          >
            {threatLevel}
          </Badge>
        </div>
      </div>

      {/* Right: Role Switcher + User Info + Notifications */}
      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setRole('ADMIN')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              user?.role === 'ADMIN'
                ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin View
          </button>
          <button
            type="button"
            onClick={() => setRole('CLIENT')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              user?.role === 'CLIENT'
                ? 'bg-amber-400 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Client View
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700 shadow-xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-semibold uppercase text-white tracking-wider">
                  Security Alerts & Notifications
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  {unreadCount} unread
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className={n.type === 'ALERT' ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-medium'}>
                        {n.title}
                      </span>
                      <span>{n.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Profile */}
        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-800">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-white">
              {user?.name}
            </span>
            <span className="text-[11px] text-slate-400">
              {user?.role === 'ADMIN' ? 'Command Director' : 'VIP Principal'}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
            {user?.role === 'ADMIN' ? <Shield size={16} /> : <User size={16} />}
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={logout}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-colors"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
