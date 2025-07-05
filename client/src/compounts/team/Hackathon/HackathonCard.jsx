
import React from 'react';
import { Calendar, MapPin, Users, Trophy, Eye } from 'lucide-react';

const HackathonCard = ({ hackathon, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <Trophy size={48} className="text-white" />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{hackathon.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{hackathon.description}</p>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400" />
            <span>{hackathon.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span>{hackathon.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Trophy size={16} className="text-gray-400" />
            <span>Prize: {hackathon.prize}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Users size={20} className="mx-auto text-gray-400 mb-1" />
            <div className="text-sm font-medium text-gray-900">
              {hackathon.participants.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Participants</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Users size={20} className="mx-auto text-gray-400 mb-1" />
            <div className="text-sm font-medium text-gray-900">
              {hackathon.teamsCount}
            </div>
            <div className="text-xs text-gray-600">Teams</div>
          </div>
        </div>

        {/* Registration Status */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            hackathon.registrationOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {hackathon.registrationOpen ? 'Registration Open' : 'Registration Closed'}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewDetails}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Eye size={16} />
          View Details & Teams
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;
