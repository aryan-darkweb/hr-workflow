HR Workflow Designer Module
A modular, visual workflow builder designed for HR administrators to create and simulate internal processes (onboarding, leave approvals, etc.) . This project was built as a functional prototype for the Tredence Studio AI Agent Engineering internship case study.
+1

 Getting Started
Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

Installation
Clone the repository or extract the project files.

Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open http://localhost:5173 in your browser.

 Architecture & Design Decisions
1. Component Decomposition 

I implemented a clear separation of concerns to ensure the system is extensible:


Canvas Layer: Uses React Flow to manage the graph state, rendering, and coordinate systems.


Node Layer: Custom-typed nodes (BaseNode.tsx) that handle their own specialized styling based on workflow roles (Task, Approval, etc.).
+1


Configuration Layer: A dynamic NodeForm system that uses controlled components to update the graph state in real-time .


Service Layer: An abstract API layer (api.ts) that handles mock data fetching and workflow simulation logic.
+1

2. Type Safety & Scalability 
+1


TypeScript Interfaces: I defined strict interfaces for WorkflowNodeData and HRNodeType to prevent runtime errors and ensure consistent data flow across the application.


Modular Node Types: The nodeTypes mapping in the canvas allows for adding new workflow steps (e.g., "Notification Node") simply by creating a new component and adding it to the map.

3. State Management 

Used React Hooks (useState, useCallback) to manage the nodes and edges, ensuring that the canvas remains performant during drag-and-drop actions.

The Simulation Engine implements a path-traversal algorithm that serializes the current graph and processes it step-by-step to provide immediate feedback to the user .

Features Implemented 

 Visual Canvas: Drag-and-drop nodes and connect them with edges .

 Custom Node Types: Start, Task, Approval, Automated Step, and End nodes .

 Dynamic Configuration: Context-aware sidebar forms that change fields based on the selected node type .

 Simulation Sandbox: A real-time log that validates the workflow structure and simulates execution paths .

 Mock API Integration: Simulated async calls for automation actions and simulation results.
+1

 Assumptions & Design Notes 
+1

Simulation Logic: For the purpose of this prototype, the simulation follows the first available path from the Start node. Complex branching (multi-path) is visually supported but logically simplified in the logs.


Start Node Constraint: I assumed a workflow must have at least one start node to begin simulation.


Persistence: Per requirements, no backend database was implemented; state is managed locally and resets on page refresh.

 If I Had More Time... 

With additional time, I would implement the following "Bonus" features:


Export/Import: Allow users to save their workflows as JSON files.


Undo/Redo: Implement a state history stack for better user experience.


Visual Validation: Highlight nodes with missing connections or configuration errors directly on the canvas.


Auto-layout: Integrate dagre to automatically organize complex workflows at the click of a button.