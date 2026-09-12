import React from 'react';
import { PlaceholderScreen } from '@/components/ui/placeholder-screen';

export default function VolunteerHomePage() {
  return (
    <PlaceholderScreen
      screenNumber={1}
      totalScreens={7}
      dashboardType="Volunteer Response Center"
      screenName="Home"
      routePath="/volunteer/home"
      loopStage="OBSERVE"
      description="Responder landing dashboard displaying welcome information, current availability status toggle, assigned mission summary, 'View Mission' button, operational updates, and a compact disaster-sensitivity heatmap."
      features={[
        "Responder Welcome Header & Quick Operational Status Indicator",
        "Availability Status Summary (Available / Busy / Unavailable)",
        "Current Mission Summary Card with direct 'View Mission' action transition",
        "Field Operational Updates & Safety Advisory Feed",
        "Compact Disaster-Sensitivity Heatmap: Informational map positioned at bottom of Home for area awareness",
      ]}
    />
  );
}
