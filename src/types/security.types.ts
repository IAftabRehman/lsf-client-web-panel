/**
 * Guard Deployment, Post Orders & Incident Telemetry Types
 * LSF Security & Personal Protection Services
 */

export type ThreatLevel = 'LOW' | 'NORMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';

export type PostStatus = 'ACTIVE' | 'STANDBY' | 'ENGAGED' | 'OFF_DUTY';

export interface GuardDeployment {
  id: string;
  badgeNumber: string;
  fullName: string;
  callsign: string;
  rank: 'FIELD_OPERATOR' | 'TACTICAL_LEAD' | 'CPO_SPECIALIST' | 'SURVEILLANCE_TECH';
  assignedSite: string;
  postLocation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  shiftStart: string;
  shiftEnd: string;
  status: PostStatus;
  armed: boolean;
  biometricHeartRate: number;
  radioFrequencyMhz: string;
  bodycamLiveStreamUrl?: string;
  lastCheckinTime: string;
}

export interface PostOrder {
  id: string;
  orderNumber: string;
  siteName: string;
  threatLevel: ThreatLevel;
  effectiveDate: string;
  primaryDirectives: string[];
  restrictedZones: string[];
  emergencyContactProtocol: string;
  authorizedVisitorList: string[];
  assignedOfficersCount: number;
  status: 'ACTIVE' | 'DRAFT' | 'SUPERSEDED';
}

export interface IncidentAlert {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  location: string;
  title: string;
  description: string;
  resolved: boolean;
  acknowledgedBy?: string;
}
