
import React from 'react';
import { X, Users, Code, ExternalLink, Star } from 'lucide-react';

const TeamDetailsModal = ({ team, onClose, onRequestJoin }) => {
  if (!team) return null;

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{team.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Compatibility Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Compatibility</span>
              <span className="text-lg font-bold text-blue-600">{team.compatibility}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCompatibilityColor(team.compatibility)}`}
                style={{ width: `${team.compatibility}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {team.compatibility >= 85 
                ? "Excellent match! Your skills align perfectly with this team."
                : team.compatibility >= 70
                ? "Good match! You have complementary skills for this team."
                : "Moderate match. Consider if you'd like to learn new technologies."}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Team</h3>
            <p className="text-gray-600 leading-relaxed">{team.description}</p>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Project</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{team.project}</h4>
              <p className="text-gray-600 text-sm">{team.projectDescription}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {team.techStack.map((tech, index) => (
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

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {team.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {member.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member}</p>
                    <p className="text-sm text-gray-600">Team Member</p>
                  </div>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: team.maxMembers - team.members }, (_, index) => (
                <div key={`empty-${index}`} className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Open Spot</p>
                    <p className="text-sm text-gray-400">Looking for teammate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            disabled={team.isRequested}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              team.isRequested
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {team.isRequested ? 'Request Sent' : 'Request to Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsModal;
