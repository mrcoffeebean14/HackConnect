
import React, { useState } from 'react';
import { X, Calendar, MapPin, Trophy, Users, Plus, ExternalLink } from 'lucide-react';
import TeamCard from '../teamproject/TeamCard';
import CreateTeamModal from '../CreateTeamModal';
import TeamDetailsModal from '../TeamDetailsModal';  
import JoinRequestModal from '../JoinRequestModal';

const HackathonDetailsModal = ({ hackathon, onClose }) => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Dummy teams data for this hackathon
  const teams = [
    {
      id: 1,
      name: "Climate AI Solutions",
      description: "Using machine learning to predict climate patterns and suggest mitigation strategies.",
      techStack: ["Python", "TensorFlow", "React", "Node.js"],
      members: 3,
      maxMembers: 5,
      compatibility: 88,
      isRequested: false,
      project: "Climate Prediction AI",
      projectDescription: "An AI system that analyzes climate data to provide accurate predictions.",
      teamMembers: ["Alex Chen", "Maria Garcia", "James Wilson"],
      hackathonId: hackathon.id
    },
    {
      id: 2,
      name: "Sustainable Transport",
      description: "Building a platform to optimize public transportation routes for reduced carbon emissions.",
      techStack: ["React", "Node.js", "MongoDB", "Google Maps API"],
      members: 2,
      maxMembers: 4,
      compatibility: 72,
      isRequested: false,
      project: "EcoTransit",
      projectDescription: "Smart routing system for eco-friendly transportation.",
      teamMembers: ["Sarah Kim", "David Brown"],
      hackathonId: hackathon.id
    }
  ];

  const handleViewTeamDetails = (team) => {
    setSelectedTeam(team);
    setShowTeamDetailsModal(true);
  };

  const handleRequestJoin = (team) => {
    setSelectedTeam(team);
    setShowJoinModal(true);
  };

  if (!hackathon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{hackathon.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Hackathon Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">{hackathon.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{hackathon.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{hackathon.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">Prize: {hackathon.prize}</span>
              </div>
            </div>
          </div>

          {/* Create Team Section */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Teams for this Hackathon</h3>
              <p className="text-gray-600">Join an existing team or create your own</p>
            </div>
            {hackathon.registrationOpen && (
              <button
                onClick={() => setShowCreateTeamModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 font-medium"
              >
                <Plus size={20} />
                Create Team
              </button>
            )}
          </div>

          {/* Teams List */}
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map(team => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onViewDetails={() => handleViewTeamDetails(team)}
                  onRequestJoin={() => handleRequestJoin(team)}
                  compatibilityThreshold={70}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h4>
              <p className="text-gray-600 mb-4">Be the first to create a team for this hackathon!</p>
              {hackathon.registrationOpen && (
                <button
                  onClick={() => setShowCreateTeamModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Create Team
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modals */}
        {showCreateTeamModal && (
          <CreateTeamModal
            onClose={() => setShowCreateTeamModal(false)}
            onSubmit={(teamData) => {
              console.log('Creating hackathon team:', teamData);
              setShowCreateTeamModal(false);
            }}
            hackathon={hackathon}
          />
        )}

        {showTeamDetailsModal && (
          <TeamDetailsModal
            team={selectedTeam}
            onClose={() => setShowTeamDetailsModal(false)}
            onRequestJoin={() => {
              setShowTeamDetailsModal(false);
              handleRequestJoin(selectedTeam);
            }}
          />
        )}

        {showJoinModal && (
          <JoinRequestModal
            team={selectedTeam}
            onClose={() => setShowJoinModal(false)}
            onConfirm={() => {
              console.log('Joining hackathon team:', selectedTeam.name);
              setShowJoinModal(false);
            }}
            type="hackathon"
            compatibilityThreshold={70}
          />
        )}
      </div>
    </div>
  );
};

export default HackathonDetailsModal;
