import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { CheckSquare, Loader2, Filter, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('tasks');
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`tasks/${taskId}/status`, { status: newStatus });
      toast.success('Status updated');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'ALL' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                         task.project?.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            All Tasks
          </h1>
          <p className="text-gray-500">View and update task progress.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-9 py-2 text-sm w-full outline-none focus:border-indigo-500"
            />
          </div>
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg pl-9 py-2 text-sm w-full outline-none focus:border-indigo-500 appearance-none bg-white"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <CheckSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="text-gray-500">Adjust your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
