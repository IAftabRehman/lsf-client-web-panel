/**
 * Stitch MCP Data Synchronization Types
 * LSF Security & Personal Protection Services
 */

export interface StitchScreenInstance {
  id: string;
  sourceScreen: string;
  title?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  hidden?: boolean;
}

export interface StitchThemeData {
  name: string;
  colors: Record<string, string>;
  typography: Record<string, {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight?: string;
    letterSpacing?: string;
  }>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
}

export interface StitchProjectMetadata {
  projectId: string;
  title: string;
  projectType: string;
  deviceType: string;
  userRole: string;
  updatedAt: string;
}

export interface StitchSyncPayload {
  project: StitchProjectMetadata;
  screens: StitchScreenInstance[];
  theme: StitchThemeData;
  syncedAt: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'SYNCING';
}
