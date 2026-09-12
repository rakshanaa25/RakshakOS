import React from 'react';
import { PlaceholderScreen } from '@/components/ui/placeholder-screen';

export default function ReportSituationPage() {
  return (
    <PlaceholderScreen
      screenNumber={3}
      totalScreens={7}
      dashboardType="Volunteer Response Center"
      screenName="Report Situation"
      routePath="/volunteer/report-situation"
      loopStage="OBSERVE"
      description="Field situation report submission portal capturing ground truth observations to directly inform and trigger Strands agent response replanning."
      features={[
        "Report Category Selector: New Survivor | Injury | Road Blocked | Resource Shortage | Unsafe Condition | Other",
        "Detailed Situation Description Field",
        "Field Location & Geolocation Input",
        "Photo & Evidence File Attachment UI",
        "Operational Notice: Submitted reports update the agent observation loop and may trigger response plan revisions",
      ]}
    />
  );
}
