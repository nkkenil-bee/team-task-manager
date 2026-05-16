import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  FolderKanban, 
  Plus, 
  Users, 
  ListTodo, 
  Loader2, 
  X, 
  LayoutGrid,
  Eye
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get('projects');
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', formData);
      toast.success('Project created successfully');
      setShowModal(false);
      setFormData({ name: '', description: '' });
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-indigo-600" />
            Projects
          </h1>
          <p className="text-gray-500">Manage and track your ongoing projects.</p>
        </div>
        
        {isAdmin && (
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" /> Create Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <FolderKanban className="w-6 h-6" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-6 line-clamp-2 h-10">
              {project.description || 'No description provided.'}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Users className="w-4 h-4" /> {project._count.members}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <ListTodo className="w-4 h-4" /> {project._count.tasks}
                </div>
              </div>
              
              <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                View <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-xl border border-gray-100">
            <FolderKanban className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
            <p className="text-gray-500">Create your first project to get started.</p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                  placeholder="e.g., Marketing Campaign"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                  placeholder="Project details..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
