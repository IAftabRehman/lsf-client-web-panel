import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import { LsfShieldLogo } from '@/components/common/LsfShieldLogo';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Shield,
  Users,
  FileText,
  CreditCard,
  FileCheck,
  Settings,
  Lock,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { sidebarCollapsed } = useAppStore();
  const location = useLocation();

  const isAdmin = user?.role === 'ADMIN';

  const adminNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: 'Guard Deployments',
      path: '/admin/deployments',
      icon: <Shield size={18} />,
      badge: 'Live',
    },
    {
      label: 'Client CRM',
      path: '/admin/crm',
      icon: <Users size={18} />,
    },
    {
      label: 'Contracts Master',
      path: '/admin/contracts',
      icon: <FileCheck size={18} />,
    },
    {
      label: 'Invoices & Billing',
      path: '/admin/invoices',
      icon: <CreditCard size={18} />,
      badge: 'Due',
    },
    {
      label: 'Post Orders',
      path: '/admin/post-orders',
      icon: <FileText size={18} />,
    },
  ];

  const clientNavItems: NavItem[] = [
    {
      label: 'Client Dashboard',
      path: '/client/dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: 'Active Contracts',
      path: '/client/contracts',
      icon: <FileCheck size={18} />,
    },
    {
      label: 'Invoices & Payments',
      path: '/client/invoices',
      icon: <CreditCard size={18} />,
      badge: 'Due',
    },
    {
      label: 'Security Settings',
      path: '/client/profile',
      icon: <Settings size={18} />,
    },
  ];

  const navItems = isAdmin ? adminNavItems : clientNavItems;

  return (
    <aside
      className={cn(
        'relative flex flex-col justify-between h-screen bg-slate-950 border-r border-slate-800 transition-all duration-300 z-40 select-none shrink-0 font-sans',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Top Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800 bg-slate-950/80 overflow-hidden">
        <LsfShieldLogo
          size={sidebarCollapsed ? 'md' : 'md'}
          showText={!sidebarCollapsed}
          withGlow={false}
        />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {!sidebarCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {isAdmin ? 'Administration' : 'Client Account'}
            </div>
          )}

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'
                    )}
                  >
                    {item.icon}
                  </span>
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {!sidebarCollapsed && item.badge && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide shrink-0',
                      item.badge === 'Due'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        {!sidebarCollapsed ? (
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span>Status:</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Lock size={12} /> Connected
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              ID: {user?.badgeNumber || 'VIP-CLI-7721'}
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-emerald-400 py-1">
            <Lock size={16} />
          </div>
        )}
      </div>
    </aside>
  );
};
