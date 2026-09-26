import { create } from 'zustand';
import { User, UserRole, AuthSession } from '@/types/auth.types';

interface AuthState extends AuthSession {
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  login: (role?: UserRole) => void;
  logout: () => void;
  toggleTwoFactor: () => void;
}

const MOCK_ADMIN_USER: User = {
  id: 'usr-admin-001',
  name: 'Commander Marcus Vance',
  email: 'm.vance@lsf-defense.ops',
  role: 'ADMIN',
  badgeNumber: 'LSF-TAC-9901',
  clearanceLevel: 'TOP_SECRET',
  twoFactorEnabled: true,
  organization: 'LSF Tactical Command HQ',
  lastLogin: new Date().toISOString(),
  phone: '+1 (800) 555-0199',
  status: 'ACTIVE',
};

const MOCK_CLIENT_USER: User = {
  id: 'usr-client-504',
  name: 'Elena Rostova',
  email: 'e.rostova@aegis-corp.global',
  role: 'CLIENT',
  badgeNumber: 'VIP-CLI-7721',
  clearanceLevel: 'LEVEL_2',
  twoFactorEnabled: true,
  organization: 'Aegis Holdings International',
  lastLogin: new Date().toISOString(),
  phone: '+1 (555) 234-8890',
  status: 'ACTIVE',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_ADMIN_USER,
  token: 'mock-jwt-token-alpha-lsf-99',
  refreshToken: 'mock-refresh-token-alpha',
  isAuthenticated: true,
  expiresAt: Date.now() + 3600 * 1000 * 8,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setRole: (role) =>
    set((state) => {
      const newUser = role === 'ADMIN' ? MOCK_ADMIN_USER : MOCK_CLIENT_USER;
      return {
        ...state,
        user: { ...newUser, role },
      };
    }),

  login: (role = 'ADMIN') =>
    set({
      user: role === 'ADMIN' ? MOCK_ADMIN_USER : MOCK_CLIENT_USER,
      token: 'mock-jwt-token-alpha-lsf-99',
      isAuthenticated: true,
      expiresAt: Date.now() + 3600 * 1000 * 8,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      expiresAt: null,
    }),

  toggleTwoFactor: () =>
    set((state) => ({
      user: state.user
        ? { ...state.user, twoFactorEnabled: !state.user.twoFactorEnabled }
        : null,
    })),
}));
