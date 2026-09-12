import React from 'react';
import { PlaceholderScreen } from '@/components/ui/placeholder-screen';

export default function MyMissionPage() {
  return (
    <PlaceholderScreen
      screenNumber={2}
      totalScreens={7}
      dashboardType="Volunteer Response Center"
      screenName="My Mission"
      routePath="/volunteer/my-mission"
      loopStage="EXECUTE"
      description="Field mission execution portal tracking assigned rescue objectives, team composition, allocated resources, field navigation route, and 5-stage mission status."
      features={[
        "Mission Objective & Target Incident Details",
        "Assigned Team Roster & Teammate Contact Numbers",
        "Allocated Rescue Vehicles & Equipment Kits",
        "Field Navigation Route & Waypoint Status",
        "5-Stage Mission Lifecycle Tracker: Assigned → Accepted → En Route → Arrived → Completed",
      ]}
    />
  );
}
