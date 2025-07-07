
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { TrendingUp, Calendar, Users } from 'lucide-react';

const SocialSidebar = () => {
  const trendingTags = [
    { tag: '#AI', posts: 234 },
    { tag: '#WebDev', posts: 189 },
    { tag: '#Hackathon', posts: 156 },
    { tag: '#React', posts: 143 },
    { tag: '#Python', posts: 98 }
  ];

  const suggestedUsers = [
    {
      name: 'David Kim',
      username: 'davidkim',
      avatar: '/api/placeholder/40/40',
      skills: 'Full Stack • React • Node.js'
    },
    {
      name: 'Lisa Zhang',
      username: 'lisazhang',
      avatar: '/api/placeholder/40/40',
      skills: 'AI/ML • Python • TensorFlow'
    },
    {
      name: 'Tom Wilson',
      username: 'tomwilson',  
      avatar: '/api/placeholder/40/40',
      skills: 'Mobile • React Native • Swift'
    }
  ];

  const upcomingEvents = [
    {
      name: 'AI Hackathon 2024',
      date: 'Mar 15-17',
      participants: '2.1k'
    },
    {
      name: 'React Conference',
      date: 'Apr 8-10',
      participants: '850'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Hashtags */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-blue-600" />
          <h3 className="font-semibold text-gray-900">Trending</h3>
        </div>
        <div className="space-y-3">
          {trendingTags.map((item, index) => (
            <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="text-blue-600 font-medium">{item.tag}</span>
              <span className="text-sm text-gray-500">{item.posts} posts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-purple-600" />
          <h3 className="font-semibold text-gray-900">Who to Follow</h3>
        </div>
        <div className="space-y-4">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900">{user.name}</h4>
                <p className="text-xs text-gray-500">@{user.username}</p>
                <p className="text-xs text-gray-600 mt-1">{user.skills}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-green-600" />
          <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
              <h4 className="font-semibold text-sm text-gray-900">{event.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{event.date}</p>
              <p className="text-xs text-blue-600 mt-1">{event.participants} participants</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialSidebar;
