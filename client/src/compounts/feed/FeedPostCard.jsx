
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Heart, MessageCircle, Share, MoreHorizontal, ExternalLink } from 'lucide-react';
import CommentsSection from './CommentsSection';
import PostActionsMenu from './PostActionsMenu';

const FeedPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatContent = (content) => {
    // Simple hashtag highlighting
    return content.replace(/#(\w+)/g, '<span class="text-blue-600 font-medium">#$1</span>');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
            <p className="text-sm text-gray-500">@{post.user.username} • {post.timestamp}</p>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowActionsMenu(!showActionsMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal size={16} className="text-gray-400" />
          </button>
          {showActionsMenu && (
            <PostActionsMenu 
              onClose={() => setShowActionsMenu(false)}
              isOwner={post.user.username === 'currentUser'} // Replace with actual logic
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
      </div>

      {/* Attached Link Preview */}
      {post.attachedLink && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2 text-blue-600">
            <ExternalLink size={16} />
            <span className="text-sm font-medium">GitHub Repository</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{post.attachedLink}</p>
        </div>
      )}

      {/* Reaction Avatars */}
      {likesCount > 0 && (
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <div className="flex -space-x-2">
            {/* Show first few likers' avatars */}
            <Avatar className="w-6 h-6 border-2 border-white">
              <AvatarFallback className="text-xs">A</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-white">
              <AvatarFallback className="text-xs">B</AvatarFallback>
            </Avatar>
            {likesCount > 2 && (
              <Avatar className="w-6 h-6 border-2 border-white">
                <AvatarFallback className="text-xs">+</AvatarFallback>
              </Avatar>
            )}
          </div>
          <span className="text-sm text-gray-600">
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isLiked 
                ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Heart size={18} className={isLiked ? 'fill-current' : ''} />
            <span className="text-sm font-medium">{likesCount}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Share size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentsSection postId={post.id} />
      )}
    </div>
  );
};

export default FeedPostCard;
