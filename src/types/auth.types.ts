/**
 * Auth & User RBAC Types
 * LSF Security & Personal Protection Services
 */

export type UserRole = 'ADMIN' | 'CLIENT' | 'OPERATIONS_DIRECTOR' | 'SECURITY_OFFICER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  badgeNumber?: string;
  clearanceLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'TOP_SECRET';
  twoFactorEnabled: boolean;
  avatarUrl?: string;
  organization?: string;
  lastLogin: string;
  phone?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  expiresAt: number | null;
}

export interface LoginCredentials {
  badgeOrEmail: string;
  pinOrPassword: string;
  twoFactorCode?: string;
  clearanceOverride?: string;
}
