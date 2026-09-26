import { create } from 'zustand';
import { ThreatLevel } from '@/types/security.types';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'ALERT' | 'SUCCESS';
  timestamp: string;
  read: boolean;
}

interface AppState {
  sidebarCollapsed: boolean;
  threatLevel: ThreatLevel;
  notifications: AppNotification[];
  stitchConnected: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setThreatLevel: (level: ThreatLevel) => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  setActiveModal: (modalId: string | null) => void;
  setStitchConnected: (connected: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  threatLevel: 'NORMAL',
  stitchConnected: true,
  activeModal: null,
  notifications: [
    {
      id: 'notif-1',
      title: 'Stitch MCP Sync Active',
      message: 'Design system tokens and layout specs synchronized from Stitch project 2865822423552972059.',
      type: 'SUCCESS',
      timestamp: '2 mins ago',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Perimeter Check-In Required',
      message: 'Post Charlie-4 checkpoint scheduled patrol overdue by 4 minutes.',
      type: 'ALERT',
      timestamp: '12 mins ago',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Invoice LSF-INV-2026-0891',
      message: 'Pending escrow clearance for Executive Protection Detail Bravo.',
      type: 'INFO',
      timestamp: '1 hour ago',
      read: true,
    },
  ],

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setThreatLevel: (threatLevel) => set({ threatLevel }),
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: `notif-${Date.now()}`,
          timestamp: 'Just now',
          read: false,
        },
        ...state.notifications,
      ],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  clearAllNotifications: () => set({ notifications: [] }),
  setActiveModal: (activeModal) => set({ activeModal }),
  setStitchConnected: (stitchConnected) => set({ stitchConnected }),
}));
