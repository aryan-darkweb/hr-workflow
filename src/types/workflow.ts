export type HRNodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface WorkflowNodeData {
  title: string;
  description?: string;
  assignee?: string;
  approverRole?: string;
  actionId?: string;
  dueDate?: string;
  metadata?: Record<string, string>;
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}