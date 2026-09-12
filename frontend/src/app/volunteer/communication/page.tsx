import React from 'react';
import { PlaceholderScreen } from '@/components/ui/placeholder-screen';

export default function VolunteerCommunicationPage() {
  return (
    <PlaceholderScreen
      screenNumber={6}
      totalScreens={7}
      dashboardType="Volunteer Response Center"
      screenName="Communication"
      routePath="/volunteer/communication"
      loopStage="MONITOR"
      description="Mission-specific communication feed broadcasting team leader instructions, automated agent updates, operational notifications, and dynamic route changes."
      features={[
        "Team Leader Instructions & Field Directives Feed",
        "Strands Agent Automated Updates (e.g. 'Route altered due to blocked bridge at Sector 4')",
        "Operational Safety Alerts & Weather Warnings",
        "Route Change Confirmations & Acknowledgment Controls",
      ]}
    />
  );
}
