import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ListTodo,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="card flex items-center gap-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Clock className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-indigo-600" />
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-500">Here's an overview of your team's productivity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Tasks" 
          value={stats?.totalTasks || 0} 
          icon={ListTodo} 
          colorClass="bg-indigo-100 text-indigo-600"
        />
        <StatCard 
          title="Completed" 
          value={stats?.completedTasks || 0} 
          icon={CheckCircle2} 
          colorClass="bg-green-100 text-green-600"
        />
        <StatCard 
          title="In Progress" 
          value={stats?.pendingTasks || 0} 
          icon={Clock} 
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard 
          title="Overdue" 
          value={stats?.overdueTasks || 0} 
          icon={AlertCircle} 
          colorClass="bg-red-100 text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Performance Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">Completion Rate</span>
              <span className="text-sm font-bold">
                {stats?.totalTasks > 0 
                  ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${stats?.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
