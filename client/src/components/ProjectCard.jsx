import { Link } from 'react-router-dom';
import { Calendar, Users, ListTodo } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="card group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {project.name}
        </h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-6 line-clamp-2 min-h-[40px]">
        {project.description || 'No description provided.'}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>{project._count?.members || 0} Members</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <ListTodo className="w-4 h-4 text-indigo-500" />
            <span>{project._count?.tasks || 0} Tasks</span>
          </div>
        </div>
        <Link 
          to={`/projects/${project.id}`}
          className="text-xs font-semibold text-indigo-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
