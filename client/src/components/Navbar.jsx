import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  LogOut
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-2 font-bold text-xl text-indigo-600">
              <FolderKanban className="w-8 h-8" />
              <span>TeamTask</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/projects" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 gap-2">
                <FolderKanban className="w-4 h-4" /> Projects
              </Link>
              <Link to="/tasks" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 gap-2">
                <CheckSquare className="w-4 h-4" /> Tasks
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-gray-900">{user.name}</span>
              <span className="text-[10px] text-indigo-600 font-bold uppercase">{user.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> 
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
