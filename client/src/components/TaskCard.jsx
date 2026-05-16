import { Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onStatusChange, isAdmin }) => {
  const statusColors = {
    PENDING: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    IN_PROGRESS: 'bg-blue-50 text-blue-700 border-blue-100',
    COMPLETED: 'bg-green-50 text-green-700 border-green-100',
  };

  const statusIcons = {
    PENDING: <Circle className="w-4 h-4" />,
    IN_PROGRESS: <Clock className="w-4 h-4" />,
    COMPLETED: <CheckCircle2 className="w-4 h-4" />,
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{task.title}</h4>
        <div className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 font-medium ${statusColors[task.status]}`}>
          {statusIcons[task.status]}
          {task.status.replace('_', ' ')}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-50">
        <div className="flex flex-col gap-1">
          <div className={`flex items-center gap-1.5 text-xs ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
            <Clock className="w-3.5 h-3.5" />
            Due: {new Date(task.dueDate).toLocaleDateString()}
            {isOverdue && <AlertCircle className="w-3.5 h-3.5" />}
          </div>
          <div className="text-xs text-indigo-600 font-medium">
            Assigned to: {task.assignee?.name || 'Unassigned'}
          </div>
        </div>

        <div className="flex gap-2">
          {onStatusChange && (
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="text-xs border rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
