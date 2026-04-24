import { useState } from 'react';
import type { Node, Edge } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowCanvas } from './components/Canvas';
import { NodeForm } from './components/Sidebar/NodeForm';
import { simulateWorkflow } from './services/api';
import type { HRNodeType, WorkflowNodeData } from './types/workflow';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];


export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<{message: string}[]>([]);
  const [nodeCounter, setNodeCounter] = useState(0);

  // Function to add new nodes to the canvas
  const addNode = (type: HRNodeType) => {
    const newNode: Node = {
      id: uuidv4(),
      type,
      position: {
        x: 100 + (nodeCounter % 3) * 200,
        y: 100 + Math.floor(nodeCounter / 3) * 150
      },
      data: { title: `New ${type} Node` },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCounter(prev => prev + 1);
  };

  const onUpdateNode = (id: string, newData: Partial<WorkflowNodeData>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
    // Sync the selected node state to keep the form updated
    setSelectedNode((curr) => curr ? { ...curr, data: { ...curr.data, ...newData } } : null);
  };

  // Serialize and test the workflow
  const handleSimulate = async () => {
    const workflowData = { nodes, edges };
    const results = await simulateWorkflow(workflowData);
    setSimulationLogs(results);
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex items-center justify-between bg-white px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">HR Workflow Designer</h1>
        <div className="flex gap-2">
          {['start', 'task', 'approval', 'automated', 'end'].map((type) => (
            <button
              key={type}
              onClick={() => addNode(type as HRNodeType)}
              className="px-3 py-1 bg-gray-100 border rounded text-sm hover:bg-gray-200"
            >
              + {type}
            </button>
          ))}
          <button 
            onClick={handleSimulate}
            className="ml-4 px-4 py-1 bg-blue-600 text-white rounded text-sm font-semibold"
          >
            Run Simulation
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        
        <div className="flex-1 relative">
          <WorkflowCanvas 
            nodes={nodes} 
            setNodes={setNodes} 
            edges={edges} 
            setEdges={setEdges} 
            onSelectNode={setSelectedNode} 
          />
        </div>

        {/* Sidebar: Form or Simulation Logs*/}
        <aside className="w-80 border-l bg-white flex flex-col">
          {selectedNode ? (
            <NodeForm node={selectedNode} onUpdate={onUpdateNode} />
          ) : (
            <div className="p-4 flex-1">
              <h3 className="font-bold mb-2">Simulation Logs</h3>
              <div className="text-sm space-y-2 max-h-96 overflow-y-auto">
                {simulationLogs.length > 0 ? (
                  simulationLogs.map((log, i) => {
                    const statusColors = {
                      success: 'bg-green-50 border-green-200 text-green-800',
                      pending: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                      error: 'bg-red-50 border-red-200 text-red-800',
                      warning: 'bg-orange-50 border-orange-200 text-orange-800'
                    };
                    return (
                      <div key={i} className={`p-2 rounded border ${statusColors[log.status as keyof typeof statusColors] || 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-gray-200 px-1 rounded">{log.step}</span>
                          <span>{log.message}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 italic">No simulation data. Create a workflow and run simulation to see results.</p>
                )}
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}