import React from 'react';
import { PlaceholderScreen } from '@/components/ui/placeholder-screen';

export default function NGOCoordinatorPage() {
  return (
    <PlaceholderScreen
      screenNumber={1}
      totalScreens={1}
      dashboardType="Volunteer Response Center"
      screenName="NGO Coordinator Management Layer"
      routePath="/volunteer/ngo"
      loopStage="EXECUTE"
      description="Additional management panel layer integrated into the Volunteer Response Center for NGO leaders and coordinators to manage organizational team rosters, availability breakdowns, and member mission assignments."
      features={[
        "Registered Member Count & NGO Roster Summary",
        "Availability Breakdown (Available / Deployed / Unavailable)",
        "Current Missions by Member Count",
        "Broadcast Directives & Messaging to Organization Members",
        "Team Registration Tools: Manual field entry & Excel bulk upload rule enforcement",
        "Excel Upload Rule Enforcement: Excel file contains team members ONLY (NGO Leader registered separately)",
      ]}
    />
  );
}
