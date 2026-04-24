import React, { useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge, 
  Panel
} from 'reactflow';

import type { 
  Node, 
  Edge, 
  Connection, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import your custom node component
import { BaseNode } from './Nodes/BaseNode';

// Define the custom node types for React Flow
const nodeTypes = {
  start: BaseNode,
  task: BaseNode,
  approval: BaseNode,
  automated: BaseNode,
  end: BaseNode,
};

// Define strict interfaces for props to ensure type safety
interface CanvasProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onSelectNode: (node: Node | null) => void;
}

/*
 WorkflowCanvas Component
 Manages the visual drag-and-drop area for the HR Workflow [cite: 65]
 */
export const WorkflowCanvas: React.FC<CanvasProps> = ({ 
  nodes, 
  setNodes, 
  edges, 
  setEdges, 
  onSelectNode 
}) => {

  // Handle structural changes to nodes (dragging, selecting, deleting)
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
  // Handle structural changes to edges
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Handle new connections between nodes
  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_event: React.MouseEvent, node: Node) => onSelectNode(node)}
        onPaneClick={() => onSelectNode(null)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#cbd5e1" gap={20} />
        <Controls />
        <Panel position="top-left" className="bg-white p-2 border rounded shadow-sm">
          <p className="text-xs text-gray-500 font-mono">HR Workflow Canvas v1.0</p>
        </Panel>
      </ReactFlow>
    </div>
  );
};