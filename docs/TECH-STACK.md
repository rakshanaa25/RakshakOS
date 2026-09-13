# RakshakOS — Technical Stack & Integration Contract

## 1. Purpose
This document defines the technical boundaries for the RakshakOS frontend and its integration with the backend and AI-agent components.
This is a hackathon prototype, not a production deployment.

The feature requirements and dashboard behavior are defined by:
- `RakshakOS_Feature_Summary.pdf`
- Technical Stack documentation

The frontend must follow those requirements and must not invent or remove product functionality.

---

## 2. Product
Product name: **RakshakOS** (Never use: RakshaOS, Rakshak OS, or any other variation)

---

## 3. Frontend Stack
### Core
- Next.js
- React
- TypeScript

### Styling
- Tailwind CSS

### UI Components
- shadcn/ui pattern utilities (clsx, tailwind-merge, cva)

### Icons
- Lucide React

---

## 4. Frontend Responsibility
The frontend is responsible for:
- Volunteer authentication UI
- Volunteer Response Center
- Official Command Center UI
- Navigation
- Operational visualization
- Incident visualization
- Response-plan visualization
- Team/resource visualization
- Agent activity visualization
- Approval/exception UI
- Communication/contact information UI
- Responsive UI behavior
- Loading, empty and error states

The frontend is NOT responsible for:
- Strands agent implementation
- Agent reasoning or orchestration
- Database implementation or direct database access
- Disaster-response business logic or algorithms
- Backend authentication logic or password hashing

---

## 5. Backend / Agent Boundary
- Integration style: HTTP REST APIs + JSON
- The frontend visualizes agent decisions, actions, operational state, response plans, plan changes, resource allocation, team assignment, field updates, and exceptional human decisions.

---

## 6. Database Boundary
- The frontend must never directly access the database.

---

## 7. Authentication Boundary
- Volunteer: Individual Volunteer, NGO Coordinator (Manual + Excel upload for team members ONLY, CV upload)
- Official: EOC / Government / Police / Fire & Rescue / Medical / Public Works (Reserved placeholder for future auth integration)

---

## 8. Dashboards Structure
1. Official Command Center (6 screens):
   - Command Center
   - Response Operations
   - Agent Activity
   - Teams & Resources
   - Exceptions / Approvals
   - Communications
2. Volunteer Response Center (7 screens):
   - Home (with compact disaster sensitivity heatmap at bottom)
   - My Mission
   - Report Situation
   - Team
   - Resources
   - Communication
   - Profile / Availability
