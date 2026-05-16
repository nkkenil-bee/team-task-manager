import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Mail, 
  Shield, 
  Calendar, 
  Trash2, 
  Loader2, 
  UserCog,
  ShieldAlert,
  Search
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const { user, isAdmin } = useAuth();

  const fetchMembers = async () => {
    try {
      const response = await api.get('/users');
      setMembers(response.data);
    } catch (error) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpdateRole = async (memberId, newRole) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    
    setActionLoading(memberId);
    try {
      await api.put(`/users/${memberId}/role`, { role: newRole });
      toast.success('User role updated');
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (memberId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    setActionLoading(memberId);
    try {
      await api.delete(`/users/${memberId}`);
      toast.success('User removed from team');
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Team Members
          </h1>
          <p className="text-gray-500">Manage your organization's members and their roles.</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="card group hover:border-indigo-100 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg border border-indigo-100">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{member.name} {member.id === user.id && '(You)'}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail className="w-3 h-3" /> {member.email}
                  </div>
                </div>
              </div>
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                member.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {member.role}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" /> Joined on {new Date(member.createdAt).toLocaleDateString()}
              </div>

              {isAdmin && member.id !== user.id && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <button
                      disabled={actionLoading === member.id}
                      onClick={() => handleUpdateRole(member.id, member.role === 'ADMIN' ? 'MEMBER' : 'ADMIN')}
                      className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                      title="Change Role"
                    >
                      <UserCog className="w-4 h-4" />
                    </button>
                    <button
                      disabled={actionLoading === member.id}
                      onClick={() => handleDeleteUser(member.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {actionLoading === member.id && <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />}
                </div>
              )}
              
              {member.id === user.id && (
                <div className="flex items-center gap-1.5 text-[10px] text-indigo-500 font-bold uppercase italic py-2">
                  <ShieldAlert className="w-3.5 h-3.5" /> This is your account
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No members found</h3>
          <p className="text-gray-500">Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default Team;
