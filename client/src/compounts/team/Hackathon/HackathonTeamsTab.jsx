
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Trophy } from 'lucide-react';
import HackathonCard from './HackathonCard';
import HackathonDetailsModal from './HackathonDetailsModal';

const HackathonTeamsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // Dummy data for hackathons
  const hackathons = [
    {
      id: 1,
      name: "TechCrunch Disrupt 2024",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      description: "Build the next big thing in 48 hours. Focus on AI, blockchain, and sustainability.",
      prize: "$50,000",
      participants: 2000,
      teamsCount: 15,
      registrationOpen: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "NASA Space Apps Challenge",
      date: "April 8-10, 2024",
      location: "Virtual",
      description: "Solve challenges related to space exploration and Earth observation using NASA data.",
      prize: "NASA Internship",
      participants: 5000,
      teamsCount: 8,
      registrationOpen: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Climate Change Hackathon",
      date: "May 20-22, 2024",
      location: "Berlin, Germany",
      description: "Create innovative solutions to combat climate change and promote sustainability.",
      prize: "€25,000",
      participants: 1500,
      teamsCount: 12,
      registrationOpen: false,
      image: "/api/placeholder/300/200"
    }
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    return hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleViewDetails = (hackathon) => {
    setSelectedHackathon(hackathon);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search hackathons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHackathons.map(hackathon => (
          <HackathonCard
            key={hackathon.id}
            hackathon={hackathon}
            onViewDetails={() => handleViewDetails(hackathon)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredHackathons.length === 0 && (
        <div className="text-center py-12">
          <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hackathons found</h3>
          <p className="text-gray-600">Try adjusting your search terms.</p>
        </div>
      )}

      {/* Hackathon Details Modal */}
      {showDetailsModal && (
        <HackathonDetailsModal
          hackathon={selectedHackathon}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default HackathonTeamsTab;
