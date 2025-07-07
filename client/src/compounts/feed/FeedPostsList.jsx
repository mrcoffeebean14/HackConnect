
import React, { useState } from 'react';
import FeedPostCard from './FeedPostCard';

const FeedPostsList = () => {
  // Dummy data for posts
  const [posts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/40/40',
        username: 'sarahchen'
      },
      content: 'Just finished our AI-powered study buddy app for the upcoming hackathon! Looking for a backend developer to join our team. We\'re using React, Python, and OpenAI API. #AI #Hackathon #TeamUp',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 5,
      isLiked: false,
      attachedLink: 'https://github.com/sarahchen/study-buddy-ai',
      tags: ['AI', 'Hackathon', 'TeamUp']
    },
    {
      id: 2,
      user: {
        name: 'Alex Rodriguez',
        avatar: '/api/placeholder/40/40',
        username: 'alexdev'
      },
      content: 'Amazing experience at TechCrunch Disrupt! Our blockchain voting system won 2nd place. Thanks to my incredible team @mike @jenny @david. The future of secure voting is here! 🚀',
      timestamp: '5 hours ago',
      likes: 28,
      comments: 12,
      isLiked: true,
      tags: ['Blockchain', 'TechCrunch', 'Victory']
    },
    {
      id: 3,
      user: {
        name: 'Maya Patel',
        avatar: '/api/placeholder/40/40',
        username: 'mayapatel'
      },
      content: 'Starting a new project to help local businesses manage inventory using React Native and Firebase. Anyone interested in contributing? We need a UI/UX designer and a mobile developer!',
      timestamp: '8 hours ago',
      likes: 7,
      comments: 3,
      isLiked: false,
      attachedLink: 'https://github.com/mayapatel/inventory-manager',
      tags: ['ReactNative', 'Firebase', 'Collaboration']
    }
  ]);

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <FeedPostCard key={post.id} post={post} />
      ))}
      
      {/* Load More Button */}
      <div className="text-center">
        <button className="px-6 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default FeedPostsList;
