import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
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
              <span className="hidden md:block">TeamTask</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 gap-2 border-b-2 border-transparent hover:border-indigo-500 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/projects" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 gap-2 border-b-2 border-transparent hover:border-indigo-500 transition-colors">
                <FolderKanban className="w-4 h-4" /> Projects
              </Link>
              <Link to="/tasks" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 gap-2 border-b-2 border-transparent hover:border-indigo-500 transition-colors">
                <CheckSquare className="w-4 h-4" /> Tasks
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <User className="w-4 h-4" />
              <span className="font-medium">{user.name}</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
