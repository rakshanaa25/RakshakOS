export type OfficialAgencyRole =
  | 'EOC / Government'
  | 'Police'
  | 'Fire & Rescue'
  | 'Medical'
  | 'Public Works';

export type OperationalScreen =
  | 'command-center'
  | 'response-operations'
  | 'agent-activity'
  | 'teams-resources'
  | 'exceptions-approvals'
  | 'communications';

export interface IncidentSummary {
  id: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'REPORTED' | 'ASSESSING' | 'DISPATCHED' | 'RESOLVED';
  location: string;
  situation: string;
  assignedTeamId?: string;
  resourcesAssigned: string[];
  routeStatus: string;
  agentStatus: string;
}

export interface ResponsePlanVersion {
  version: string;
  trigger: string;
  changes: string;
  reason: string;
  status: 'ACTIVE' | 'INVALIDATED' | 'SUPERSEDED';
  timestamp: string;
}

export interface AgentEvent {
  id: string;
  timestamp: string;
  eventType: string;
  summary: string;
  affectedPlanId?: string;
  affectedTeamId?: string;
}

export interface ExceptionalApprovalAction {
  id: string;
  proposedAction: string;
  reason: string;
  impact: string;
  requestingAgent: string;
  timestamp: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'MODIFIED';
}
