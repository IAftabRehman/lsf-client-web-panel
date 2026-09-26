/**
 * Centralized Design System Engine - Apex Aegis Cyber-Physical HUD
 * LSF Security & Personal Protection Services
 * 
 * Strict theme configuration adhering to Architectural Mandate #3.
 * Zero hardcoded hex codes allowed in components.
 */

export const THEME_CONFIG = {
  name: 'Apex Aegis Cyber-Physical HUD',
  version: '2.4.0',
  colors: {
    // Core Mandatory Brand Tokens
    primary: {
      neon: '#39FF14',        // Kinetic Green - verified surveillance, active telemetry, primary actions
      dim: '#2AE500',
      dark: '#053900',
      glow: 'rgba(57, 255, 20, 0.4)',
      subtle: 'rgba(57, 255, 20, 0.1)',
      border: 'rgba(57, 255, 20, 0.35)',
    },
    secondary: {
      neon: '#FF5F1F',        // Alert Orange - threat escalations, critical breaches, overdue status
      dim: '#D84910',
      dark: '#5C1900',
      glow: 'rgba(255, 95, 31, 0.4)',
      subtle: 'rgba(255, 95, 31, 0.12)',
      border: 'rgba(255, 95, 31, 0.6)',
    },
    tertiary: {
      neon: '#00F0FF',        // Tactical Cyan - auxiliary data, encrypted handshakes, geospatial
      dim: '#00DBE9',
      dark: '#00363A',
      glow: 'rgba(0, 240, 255, 0.4)',
      subtle: 'rgba(0, 240, 255, 0.12)',
    },
    background: {
      deepBlack: '#000000',   // Base Void - absolute black canvas
      charcoal: '#121212',    // Surface Elevation Level 1
      charcoalLight: '#181818',// Surface Elevation Level 2
      charcoalMid: '#1C1B1B', // Mid containers
      panel: '#201F1F',       // Elevated panel
      high: '#2A2A2A',        // Top modal/dialog surface
    },
    text: {
      signal: '#FFFFFF',      // Direct pure contrast
      onSurface: '#E5E2E1',   // Off-white primary text
      muted: '#94A3B8',       // Slate silver for metadata
      subtle: '#64748B',      // Inactive/placeholder text
    },
    stroke: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      mid: 'rgba(255, 255, 255, 0.15)',
      active: 'rgba(57, 255, 20, 0.4)',
      alert: 'rgba(255, 95, 31, 0.6)',
    },
  },
  typography: {
    fontHeadline: 'Space Grotesk, sans-serif',
    fontBody: 'Hanken Grotesk, Inter, sans-serif',
    fontMono: 'JetBrains Mono, monospace',
  },
  elevation: {
    level0: 'bg-deep-black',
    level1: 'bg-charcoal border border-charcoal-border backdrop-blur-md',
    level2: 'bg-charcoal-light border border-primary-border shadow-tactical-card',
    level3: 'bg-charcoal-panel border border-secondary-border shadow-neon-orange',
    modal: 'bg-charcoal border border-charcoal-border shadow-2xl backdrop-blur-xl',
  },
  shadows: {
    neonGreen: '0 0 15px rgba(57, 255, 20, 0.4), 0 0 30px rgba(57, 255, 20, 0.2)',
    neonOrange: '0 0 15px rgba(255, 95, 31, 0.5), 0 0 30px rgba(255, 95, 31, 0.2)',
    neonCyan: '0 0 15px rgba(0, 240, 255, 0.4)',
  },
  transitions: {
    default: 'transition-all duration-200 ease-in-out',
    glow: 'transition-shadow duration-300 ease-out',
  },
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
