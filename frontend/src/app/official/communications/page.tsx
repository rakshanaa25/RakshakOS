import React from 'react';
import { PlaceholderScreen } from '@/components/ui/placeholder-screen';

export default function CommunicationsPage() {
  return (
    <PlaceholderScreen
      screenNumber={6}
      totalScreens={6}
      dashboardType="Official Command Center"
      screenName="Communications"
      routePath="/official/communications"
      loopStage="MONITOR"
      description="External rescue team contact directory, inter-agency communication channels, field situation report feeds, and official agency updates."
      features={[
        "Rescue Team Contact Directory: Team Leader Contact, Mobile/Radio Frequencies, Organization, Contact Address",
        "Inter-Agency Contact Matrix: Police EOC, Fire Control, Medical Dispatch, Public Works Desk",
        "Field Reports Stream: Citizen and volunteer field observations",
        "Agent Notifications & Directives: Automated system updates and broadcast directives",
        "External Communication Protocol: Direct phone/radio contact channels provided for external team communication",
      ]}
    />
  );
}
