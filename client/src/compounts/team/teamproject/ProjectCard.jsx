
import React from 'react';
import { Code, Star, ExternalLink, Github, Eye } from 'lucide-react';

const ProjectCard = ({ project, onViewDetails, onRequestJoin }) => {
  const getCompatibilityColor = (percentage) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCompatibilityTextColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isEligible = project.compatibility >= 50;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-2">{project.title}</h3>
        <div className={`text-sm font-medium ${getCompatibilityTextColor(project.compatibility)} ml-2`}>
          {project.compatibility}% match
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

      {/* Owner */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {project.owner.avatar}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{project.owner.name}</p>
          <p className="text-xs text-gray-500">{project.owner.username}</p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Code size={16} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Compatibility Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600">Compatibility</span>
          <span className="text-xs font-medium text-gray-700">{project.compatibility}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getCompatibilityColor(project.compatibility)}`}
            style={{ width: `${project.compatibility}%` }}
          ></div>
        </div>
      </div>

      {/* Links */}
      {(project.githubLink || project.liveDemo) && (
        <div className="flex gap-2 mb-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
            >
              <Github size={12} />
              GitHub
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Eye size={16} />
          View Details
        </button>
        <button
          onClick={onRequestJoin}
          disabled={project.isRequested || !isEligible}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            project.isRequested
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : !isEligible
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
          }`}
          title={!isEligible ? 'Minimum 50% compatibility required' : ''}
        >
          {project.isRequested ? 'Requested' : !isEligible ? 'Not Eligible' : 'Request to Join'}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
