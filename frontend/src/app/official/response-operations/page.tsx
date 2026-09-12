'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/official/PageHeader';
import { IncidentListPanel } from '@/components/official/IncidentListPanel';
import { OperationsMapVisualization } from '@/components/official/OperationsMapVisualization';
import { IncidentDetailWorkspace } from '@/components/official/IncidentDetailWorkspace';
import { mockResponseOperations, mockOperationZones } from '@/lib/mock/response-operations-data';
import { ResponseOperationItem } from '@/lib/types/official';

export default function ResponseOperationsPage() {
  const operations = mockResponseOperations;
  const zones = mockOperationZones;

  // Interactivity State
  const [selectedOperationId, setSelectedOperationId] = useState<string>(operations[0].id);
  const [selectedZoneId, setSelectedZoneId] = useState<string>(operations[0].zoneId);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Active operation object
  const selectedOperation =
    operations.find((op) => op.id === selectedOperationId) || operations[0];

  // Filtered operations list based on filter bar and active zone selection
  const filteredOperations = operations.filter((op) => {
    // Apply severity/status filter
    if (activeFilter === 'CRITICAL' && op.severity !== 'CRITICAL') return false;
    if (activeFilter === 'WARNING' && op.severity !== 'WARNING') return false;
    if (activeFilter === 'ACTIVE' && op.status !== 'RESPONSE_ACTIVE') return false;
    if (activeFilter === 'MONITORING' && op.status !== 'MONITORING') return false;
    return true;
  });

  const handleSelectOperation = (op: ResponseOperationItem) => {
    setSelectedOperationId(op.id);
    setSelectedZoneId(op.zoneId);
  };

  const handleSelectZone = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    // Find first incident in this zone if any
    const zoneOp = operations.find((op) => op.zoneId === zoneId);
    if (zoneOp) {
      setSelectedOperationId(zoneOp.id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-6 py-6 font-sans">
      {/* Compact Page Header */}
      <PageHeader
        title="Response Operations"
        subtitle="Active disaster response operations, incident management, and versioned rescue plans."
        scenarioName="Metro City Flood Response — Monsoon Emergency"
        regionLocation="North Sector EOC Operations Desk"
        operationStatus="RESPONSE ACTIVE"
        lastUpdated="14:34:00 (Live Operations)"
      />

      {/* UNIFIED OPERATIONAL WORKSPACE (3-Area Combined Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* A. INCIDENTS / OPERATIONS QUEUE LIST (4 Cols on Desktop) */}
        <div className="lg:col-span-4 h-full">
          <IncidentListPanel
            operations={filteredOperations}
            selectedOperationId={selectedOperationId}
            onSelectOperation={handleSelectOperation}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* B & C. OPERATIONS MAP & SELECTED INCIDENT / PLAN WORKSPACE (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Situation Map Visualization */}
          <OperationsMapVisualization
            zones={zones}
            selectedZoneId={selectedZoneId}
            onSelectZone={handleSelectZone}
            selectedOperation={selectedOperation}
          />

          {/* Selected Incident & Response Plan Details Workspace */}
          <IncidentDetailWorkspace operation={selectedOperation} />
        </div>
      </div>
    </div>
  );
}
