
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';

const CommentsSection = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments] = useState([
    {
      id: 1,
      user: {
        name: 'Mike Johnson',
        avatar: '/api/placeholder/32/32',
        username: 'mikej'
      },
      content: 'This looks amazing! I\'d love to help with the backend. I have experience with Python and FastAPI.',
      timestamp: '1 hour ago',
      likes: 3,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: 'Emma Wilson',
        avatar: '/api/placeholder/32/32',
        username: 'emmaw'
      },
      content: 'Great work! The UI looks really clean. Are you planning to add voice recognition features?',
      timestamp: '45 minutes ago',
      likes: 1,
      isLiked: true
    }
  ]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    // Handle comment submission logic here
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      {/* Comment Input */}
      <div className="flex gap-3 mb-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/api/placeholder/32/32" alt="Your avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Post
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">@{comment.user.username}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-800">{comment.content}</p>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <button
                  className={`flex items-center gap-1 text-xs ${
                    comment.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  } transition-colors`}
                >
                  <Heart size={12} className={comment.isLiked ? 'fill-current' : ''} />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
