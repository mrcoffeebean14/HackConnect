
import React from 'react';
import { Users, Code, Star, ExternalLink } from 'lucide-react';

const TeamCard = ({ team, onViewDetails, onRequestJoin, compatibilityThreshold = 50 }) => {
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

  const isEligible = team.compatibility >= compatibilityThreshold;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{team.name}</h3>
        <div className={`text-sm font-medium ${getCompatibilityTextColor(team.compatibility)}`}>
          {team.compatibility}% match
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{team.description}</p>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Code size={16} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {team.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Members and Compatibility */}
      <div className="mb-4 space-y-3">
        {/* Members */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {team.members}/{team.maxMembers} members
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {team.maxMembers - team.members} spots left
          </div>
        </div>

        {/* Compatibility Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Compatibility</span>
            <span className="text-xs font-medium text-gray-700">{team.compatibility}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getCompatibilityColor(team.compatibility)}`}
              style={{ width: `${team.compatibility}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink size={16} />
          View Details
        </button>
        <button
          onClick={onRequestJoin}
          disabled={team.isRequested || !isEligible}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            team.isRequested
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : !isEligible
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
          }`}
          title={!isEligible ? `Minimum ${compatibilityThreshold}% compatibility required` : ''}
        >
          {team.isRequested ? 'Requested' : !isEligible ? 'Not Eligible' : 'Request to Join'}
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
