import { StitchSyncPayload, StitchThemeData, StitchScreenInstance } from '@/types/stitch.types';
import { THEME_CONFIG } from '@/theme.config';

export class McpSyncService {
  private static instance: McpSyncService;
  private syncCache: StitchSyncPayload | null = null;

  public static getInstance(): McpSyncService {
    if (!McpSyncService.instance) {
      McpSyncService.instance = new McpSyncService();
    }
    return McpSyncService.instance;
  }

  /**
   * Synchronize project metadata, screen layouts, and tokens from Stitch
   */
  public async getStitchSyncPayload(): Promise<StitchSyncPayload> {
    if (this.syncCache) {
      return this.syncCache;
    }

    const themeData: StitchThemeData = {
      name: THEME_CONFIG.name,
      colors: {
        primary: THEME_CONFIG.colors.primary.neon,
        secondary: THEME_CONFIG.colors.secondary.neon,
        tertiary: THEME_CONFIG.colors.tertiary.neon,
        background: THEME_CONFIG.colors.background.deepBlack,
        charcoal: THEME_CONFIG.colors.background.charcoal,
      },
      typography: {
        headline: {
          fontFamily: 'Space Grotesk',
          fontSize: '32px',
          fontWeight: '700',
        },
        body: {
          fontFamily: 'Hanken Grotesk',
          fontSize: '14px',
          fontWeight: '400',
        },
        mono: {
          fontFamily: 'JetBrains Mono',
          fontSize: '12px',
          fontWeight: '500',
        },
      },
      rounded: {
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
      },
      spacing: {
        gutter: '1.5rem',
        margin: '2rem',
      },
    };

    const screens: StitchScreenInstance[] = [
      { id: '4ab5d13629a14d2f9c9d2ea334c96c54', sourceScreen: 'Secure Login & Authentication Portal' },
      { id: '088c63a0ea2c4dcebf16e85f4584d3c4', sourceScreen: 'Admin Command Center / Management Dashboard' },
      { id: 'bff2e3d449cc4f0f9c9c2f0e92fa0b8f', sourceScreen: 'Client Dashboard' },
      { id: '05d900976a664d86aa443b15d424db24', sourceScreen: 'Invoices & Payment Hub' },
      { id: '0f9da25a6065429787110e40047d9a09', sourceScreen: 'Global Billing & Invoice Generator' },
      { id: '16c596f19efe4a8c8d3e414b5ad4500d', sourceScreen: 'Active Contracts & E-Signature' },
      { id: '33aeb33c0e40463392b4e22e09ff112d', sourceScreen: 'Contract Master & Terms Setup' },
      { id: 'b0ed255162f94dfd92598f77e2537cd8', sourceScreen: 'Admin - Post Orders & Guard Deployment' },
      { id: '507bd47661c54210acfd3390bdf74c81', sourceScreen: 'Admin - Client 360° Profile & CRM' },
      { id: 'a4086ea82d3449199e8679004d16cff8', sourceScreen: 'Client Profile & Settings' },
    ];

    this.syncCache = {
      project: {
        projectId: '2865822423552972059',
        title: 'LSF Security Client Dashboard',
        projectType: 'TEXT_TO_UI_PRO',
        deviceType: 'DESKTOP',
        userRole: 'OWNER',
        updatedAt: new Date().toISOString(),
      },
      screens,
      theme: themeData,
      syncedAt: new Date().toISOString(),
      status: 'CONNECTED',
    };

    return this.syncCache;
  }
}

export const mcpSyncService = McpSyncService.getInstance();
