export const fetchAutomations = async () => {
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Document", params: ["template"] }
  ];
};

import type { Node, Edge } from 'reactflow';

export const simulateWorkflow = async (workflow: { nodes: Node[]; edges: Edge[] }) => {
  const { nodes, edges } = workflow;
  const logs: { step: number; message: string; status: string }[] = [];

  console.log("Simulating workflow:", { nodes, edges });

  if (nodes.length === 0) {
    return [{ step: 1, message: "No nodes in workflow", status: "error" }];
  }

  // Find start node
  const startNode = nodes.find(node => node.type === 'start');
  if (!startNode) {
    return [{ step: 1, message: "No start node found", status: "error" }];
  }

  logs.push({ step: 1, message: `Workflow started at "${startNode.data.title}"`, status: "success" });

  // Simple path traversal simulation
  let currentNodeId = startNode.id;
  let step = 2;
  // eslint-disable-next-line no-useless-assignment
  let message = "";
  // eslint-disable-next-line no-useless-assignment
  let nodeStatus = "success";

  while (currentNodeId) {
    const currentNode = nodes.find(n => n.id === currentNodeId);
    if (!currentNode) break;

    // Find outgoing edges from current node
    const outgoingEdges = edges.filter(edge => edge.source === currentNodeId);

    if (outgoingEdges.length === 0) {
      // End of workflow
      logs.push({ step, message: `Workflow completed at "${currentNode.data.title}"`, status: "success" });
      break;
    }

    // For simplicity, take the first outgoing edge
    const nextEdge = outgoingEdges[0];
    const nextNode = nodes.find(n => n.id === nextEdge.target);

    if (!nextNode) break;

    // Simulate node execution based on type
    switch (nextNode.type) {
      case 'task':
        message = `Task "${nextNode.data.title}" assigned${nextNode.data.assignee ? ` to ${nextNode.data.assignee}` : ''}`;
        nodeStatus = "pending";
        break;
      case 'approval':
        message = `Approval "${nextNode.data.title}" pending${nextNode.data.approverRole ? ` from ${nextNode.data.approverRole}` : ''}`;
        nodeStatus = "pending";
        break;
      case 'automated':
        message = `Automated action "${nextNode.data.title}" executed`;
        nodeStatus = "success";
        break;
      case 'end':
        message = `Workflow ended at "${nextNode.data.title}"`;
        nodeStatus = "success";
        break;
      default:
        message = `Processed "${nextNode.data.title}"`;
        nodeStatus = "success";
    }

    logs.push({ step, message, status: nodeStatus });
    currentNodeId = nextNode.id;
    step++;

    // Prevent infinite loops
    if (step > 20) {
      logs.push({ step, message: "Workflow simulation stopped (possible loop detected)", status: "warning" });
      break;
    }
  }

  return logs;
};