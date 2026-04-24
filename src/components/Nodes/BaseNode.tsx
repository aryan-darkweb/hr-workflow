import { Handle, Position } from 'reactflow';
import type { NodeProps} from 'reactflow';
import type{ WorkflowNodeData } from '../../types/workflow';

export const BaseNode = ({ data, selected, type }: NodeProps<WorkflowNodeData>) => {
  const colorMap = {
    start: 'border-green-500 bg-green-50',
    task: 'border-blue-500 bg-blue-50',
    approval: 'border-amber-500 bg-amber-50',
    automated: 'border-purple-500 bg-purple-50',
    end: 'border-red-500 bg-red-50',
  };

  return (
    <div className={`p-3 rounded-md border-2 shadow-sm ${colorMap[type as keyof typeof colorMap] || 'bg-white'} ${selected ? 'ring-2 ring-blue-400' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="text-[10px] uppercase font-bold text-gray-400">{type}</div>
      <div className="text-sm font-semibold text-gray-800">{data.title}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};