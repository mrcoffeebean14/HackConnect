
import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Code, Star } from 'lucide-react';
import TeamCard from './TeamCard';
import TeamDetailsModal from './TeamDetailsModal';
import CreateTeamModal from './CreateTeamModal';
import JoinRequestModal from './JoinRequestModal';

const TeamList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Dummy data for teams
  const teams = [
    {
      id: 1,
      name: "AI Healthcare Solutions",
      description: "Building an AI-powered diagnostic tool for early disease detection using machine learning and computer vision.",
      techStack: ["React", "Python", "TensorFlow", "Node.js"],
      members: 3,
      maxMembers: 5,
      compatibility: 92,
      project: "MedAI Diagnostic Platform",
      projectDescription: "An innovative platform that uses AI to analyze medical images and provide early diagnosis suggestions.",
      teamMembers: ["Alice Johnson", "Bob Smith", "Carol Davis"],
      isRequested: false
    },
    {
      id: 2,
      name: "Sustainable Tech Innovators",
      description: "Creating a carbon footprint tracking app with gamification elements to encourage eco-friendly behavior.",
      techStack: ["Vue.js", "Firebase", "JavaScript", "Chart.js"],
      members: 4,
      maxMembers: 6,
      compatibility: 78,
      project: "EcoTracker Pro",
      projectDescription: "A comprehensive app that helps users track and reduce their carbon footprint through daily challenges.",
      teamMembers: ["David Wilson", "Emma Brown", "Frank Miller", "Grace Lee"],
      isRequested: false
    },
    {
      id: 3,
      name: "FinTech Revolutionaries",
      description: "Developing a blockchain-based micro-investment platform for young professionals and students.",
      techStack: ["React", "Solidity", "Web3.js", "Express"],
      members: 2,
      maxMembers: 4,
      compatibility: 85,
      project: "CryptoSave",
      projectDescription: "A user-friendly platform that makes cryptocurrency investment accessible to beginners.",
      teamMembers: ["Henry Kim", "Ivy Chen"],
      isRequested: true
    }
  ];

  const techStacks = ["all", "React", "Vue.js", "Python", "Node.js", "JavaScript", "Solidity"];

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTechStack === 'all' || team.techStack.includes(selectedTechStack);
    return matchesSearch && matchesTech;
  });

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (sortBy) {
      case 'compatibility':
        return b.compatibility - a.compatibility;
      case 'members':
        return b.members - a.members;
      default:
        return b.id - a.id; // newest first
    }
  });

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    setShowDetailsModal(true);
  };

  const handleRequestJoin = (team) => {
    setSelectedTeam(team);
    setShowJoinModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams or projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 items-center">
            {/* Tech Stack Filter */}
            <select
              value={selectedTechStack}
              onChange={(e) => setSelectedTechStack(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {techStacks.map(tech => (
                <option key={tech} value={tech}>
                  {tech === 'all' ? 'All Tech Stacks' : tech}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="compatibility">Best Match</option>
              <option value="members">Most Members</option>
            </select>

            {/* Create Team Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Create New Team
            </button>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            onViewDetails={() => handleViewDetails(team)}
            onRequestJoin={() => handleRequestJoin(team)}
          />
        ))}
      </div>

      {/* Empty State */}
      {sortedTeams.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search filters or create a new team.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Create New Team
          </button>
        </div>
      )}

      {/* Modals */}
      {showDetailsModal && (
        <TeamDetailsModal
          team={selectedTeam}
          onClose={() => setShowDetailsModal(false)}
          onRequestJoin={() => {
            setShowDetailsModal(false);
            handleRequestJoin(selectedTeam);
          }}
        />
      )}

      {showCreateModal && (
        <CreateTeamModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(teamData) => {
            console.log('Creating team:', teamData);
            setShowCreateModal(false);
          }}
        />
      )}

      {showJoinModal && (
        <JoinRequestModal
          team={selectedTeam}
          onClose={() => setShowJoinModal(false)}
          onConfirm={() => {
            console.log('Joining team:', selectedTeam.name);
            setShowJoinModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TeamList;
