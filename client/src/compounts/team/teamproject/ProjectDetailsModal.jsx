
import React from 'react';
import { X, Code, ExternalLink, Github, Star, User } from 'lucide-react';

const ProjectDetailsModal = ({ project, onClose, onRequestJoin }) => {
  if (!project) return null;

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isEligible = project.compatibility >= 50;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Owner Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {project.owner.avatar}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{project.owner.name}</p>
              <p className="text-sm text-gray-600">{project.owner.username}</p>
              <p className="text-xs text-gray-500">Project Owner</p>
            </div>
          </div>

          {/* Compatibility Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Compatibility</span>
              <span className="text-lg font-bold text-blue-600">{project.compatibility}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCompatibilityColor(project.compatibility)}`}
                style={{ width: `${project.compatibility}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {project.compatibility >= 85 
                ? "Excellent match! Your skills align perfectly with this project."
                : project.compatibility >= 70
                ? "Good match! You have complementary skills for this project."
                : project.compatibility >= 50
                ? "Moderate match. This could be a great learning opportunity."
                : "Below eligibility threshold. Consider improving relevant skills."}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Project</h3>
            <p className="text-gray-600 leading-relaxed">{project.detailedDescription}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Code size={14} />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.githubLink || project.liveDemo) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Links</h3>
              <div className="flex gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Github size={16} />
                    GitHub Repository
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={onRequestJoin}
            disabled={project.isRequested || !isEligible}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              project.isRequested
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : !isEligible
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
            title={!isEligible ? 'Minimum 50% compatibility required' : ''}
          >
            {project.isRequested ? 'Request Sent' : !isEligible ? 'Not Eligible' : 'Request to Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
