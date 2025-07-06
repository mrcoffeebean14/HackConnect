
import React from 'react';
import { X, Users, Star, Code } from 'lucide-react';

const JoinRequestModal = ({ team, onClose, onConfirm, type = "team", compatibilityThreshold = 50 }) => {
  if (!team) return null;

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompatibilityMessage = (percentage) => {
    if (type === "project") {
      if (percentage >= 85) {
        return "Excellent match! Your skills align perfectly with this project's needs.";
      }
      if (percentage >= 70) {
        return "Good match! You have complementary skills that would benefit this project.";
      }
      if (percentage >= 50) {
        return "Moderate match. This could be a great learning opportunity.";
      }
      return "Lower match, but diversity in skills can bring unique perspectives.";
    } else {
      if (percentage >= 85) {
        return "Excellent match! Your skills align perfectly with this team's needs.";
      }
      if (percentage >= 70) {
        return "Good match! You have complementary skills that would benefit this team.";
      }
      if (percentage >= 50) {
        return "Moderate match. This could be a great learning opportunity.";
      }
      return "Lower match, but diversity in skills can bring unique perspectives.";
    }
  };

  const isEligible = team.compatibility >= compatibilityThreshold;
  const entityName = type === "project" ? team.title : team.name;
  const entityDescription = type === "project" ? team.description : team.description;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Join {type === "project" ? "Project" : "Team"} Request
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Entity Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{entityName}</h3>
            <p className="text-gray-600 text-sm">{entityDescription}</p>
          </div>

          {/* Compatibility Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-center mb-3">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getCompatibilityColor(team.compatibility)} mb-1`}>
                  {team.compatibility}%
                </div>
                <div className="text-sm text-gray-600">Compatibility Match</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full ${
                  team.compatibility >= 85 ? 'bg-green-500' :
                  team.compatibility >= 70 ? 'bg-blue-500' :
                  team.compatibility >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${team.compatibility}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              {getCompatibilityMessage(team.compatibility)}
            </p>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-4">
            {type !== "project" && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Users size={20} className="mx-auto text-gray-400 mb-1" />
                <div className="text-sm font-medium text-gray-900">
                  {team.members}/{team.maxMembers}
                </div>
                <div className="text-xs text-gray-600">Members</div>
              </div>
            )}
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Code size={20} className="mx-auto text-gray-400 mb-1" />
              <div className="text-sm font-medium text-gray-900">
                {team.techStack.length}
              </div>
              <div className="text-xs text-gray-600">Technologies</div>
            </div>
          </div>

          {/* Tech Stack Preview */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</div>
            <div className="flex flex-wrap gap-1">
              {team.techStack.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {team.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  +{team.techStack.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Eligibility Warning */}
          {!isEligible && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <strong>Not eligible:</strong> Minimum {compatibilityThreshold}% compatibility required for this {type}.
              </p>
            </div>
          )}

          {/* Confirmation Message */}
          {isEligible && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Ready to join?</strong> Your request will be sent to the {type === "project" ? "project owner" : "team leader"} for review. 
                You'll receive a notification once they respond.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isEligible}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
              !isEligible
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestModal;
