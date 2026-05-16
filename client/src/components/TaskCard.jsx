import { Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onStatusChange }) => {
  const statusColors = {
    PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-200',
    COMPLETED: 'bg-green-100 text-green-700 border-green-200',
  };

  const statusIcons = {
    PENDING: <Circle className="w-4 h-4" />,
    IN_PROGRESS: <Clock className="w-4 h-4" />,
    COMPLETED: <CheckCircle2 className="w-4 h-4" />,
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-gray-900 line-clamp-1">{task.title}</h4>
        <div className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-bold uppercase ${statusColors[task.status]}`}>
          {statusIcons[task.status]}
          {task.status === 'PENDING' ? 'To Do' : task.status.replace('_', ' ')}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
        {task.description}
      </p>

      <div className="pt-4 border-t border-gray-100 space-y-2">
        <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          <Clock className="w-3.5 h-3.5" />
          Due: {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && <AlertCircle className="w-3.5 h-3.5" />}
        </div>
        
        <div className="text-xs text-indigo-600 font-bold">
          Assigned to: {task.assignee?.name}
        </div>

        {task.project?.name && (
          <div className="text-[10px] text-gray-400 font-bold uppercase">
            Project: {task.project.name}
          </div>
        )}

        {onStatusChange && (
          <div className="pt-2">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="w-full text-xs border rounded-lg px-2 py-1.5 bg-gray-50 font-medium"
            >
              <option value="PENDING">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
