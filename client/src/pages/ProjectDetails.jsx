import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { 
  Plus, 
  Users, 
  ListTodo, 
  Loader2, 
  ArrowLeft,
  UserPlus,
  Calendar,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const { isAdmin } = useAuth();

  // Task form state
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assigneeId: ''
  });

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      toast.error('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!isAdmin) return;
    try {
      const response = await api.get('/users');
      setAvailableUsers(response.data);
    } catch (error) {
      console.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchUsers();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { ...taskData, projectId: id });
      toast.success('Task created and assigned!');
      setShowTaskModal(false);
      setTaskData({ title: '', description: '', dueDate: '', assigneeId: '' });
      fetchProjectDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleAddMember = async (userId) => {
    try {
      await api.post(`/projects/${id}/members`, { userId });
      toast.success('Member added to project');
      setShowMemberModal(false);
      fetchProjectDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add member');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      toast.success('Status updated');
      fetchProjectDetails();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
  if (!project) return <div className="text-center py-20">Project not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
        
        {isAdmin && (
          <div className="flex gap-4">
            <button onClick={() => setShowMemberModal(true)} className="btn-secondary flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Add Member
            </button>
            <button onClick={() => setShowTaskModal(true)} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Members Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Project Members
            </h3>
            <div className="space-y-3">
              {project.members?.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ListTodo className="w-4 h-4" /> Project Tasks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.tasks?.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
                isAdmin={isAdmin}
              />
            ))}
            {project.tasks?.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white rounded-xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400">No tasks created yet for this project.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create New Task</h2>
              <button onClick={() => setShowTaskModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskData.title}
                  onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                  className="input-field"
                  placeholder="e.g., Design homepage"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows="2"
                  value={taskData.description}
                  onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                  className="input-field"
                ></textarea>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  required
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({...taskData, dueDate: e.target.value})}
                  className="input-field"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Assign To</label>
                <select
                  required
                  value={taskData.assigneeId}
                  onChange={(e) => setTaskData({...taskData, assigneeId: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select Member</option>
                  {project.members?.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full py-3">Create Task</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add Team Member</h2>
              <button onClick={() => setShowMemberModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {availableUsers
                .filter(u => !project.members.some(m => m.id === u.id))
                .map((u) => (
                <div key={u.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddMember(u.id)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {availableUsers.filter(u => !project.members.some(m => m.id === u.id)).length === 0 && (
                <p className="text-center text-gray-500 py-4">No other members available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
