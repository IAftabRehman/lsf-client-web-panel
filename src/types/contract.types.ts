/**
 * Contract Master & Terms Setup Types
 * LSF Security & Personal Protection Services
 */

export type ContractStatus = 'ACTIVE' | 'PENDING_SIGNATURE' | 'EXPIRING_SOON' | 'EXPIRED' | 'TERMINATED';

export interface RateItem {
  id: string;
  roleTitle: string; // e.g., Senior Close Protection Officer (CPO)
  standardRatePerHour: number;
  hazardRatePerHour: number;
  holidayRatePerHour: number;
  minShiftHours: number;
}

export interface ContractClause {
  id: string;
  section: string;
  title: string;
  content: string;
  isMandatory: boolean;
  isEditable: boolean;
}

export interface Contract {
  id: string;
  contractCode: string; // e.g. LSF-CTR-2026-904
  title: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  monthlyRetainer: number;
  totalContractValue: number;
  rateCards: RateItem[];
  clauses: ContractClause[];
  eSignatureStatus: {
    clientSigned: boolean;
    clientSignerName?: string;
    clientSignedAt?: string;
    docusignEnvelopeId?: string;
    securityDirectorSigned: boolean;
    securityDirectorSignedAt?: string;
    ipAuditTrail?: string;
  };
  ndaAttached: boolean;
  armedEscortAuthorized: boolean;
  liabilityCoverageUSD: number;
}
