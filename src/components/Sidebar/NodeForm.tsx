import type { WorkflowNodeData, HRNodeType } from '../../types/workflow';

interface Props {
  node: { id: string; type: HRNodeType; data: WorkflowNodeData };
  onUpdate: (id: string, newData: Partial<WorkflowNodeData>) => void;
}

export const NodeForm = ({ node, onUpdate }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate(node.id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 border-l bg-white w-80 h-full overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Edit {node.type} Node</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={node.data.title} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        {node.type === 'task' && (
          <>
            <div>
              <label className="block text-sm font-medium">Assignee</label>
              <input name="assignee" value={node.data.assignee || ''} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Due Date</label>
              <input type="date" name="dueDate" value={node.data.dueDate || ''} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
          </>
        )}

        {node.type === 'approval' && (
          <div>
            <label className="block text-sm font-medium">Approver Role</label>
            <select name="approverRole" value={node.data.approverRole || ''} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="Manager">Manager</option>
              <option value="HRBP">HRBP</option>
              <option value="Director">Director</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};