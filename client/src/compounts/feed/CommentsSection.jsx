import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';

const CommentsSection = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/post/comments/${postId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('Fetched comments:', data);
        if (Array.isArray(data)) {
          setComments(data);
        } else if (Array.isArray(data.comments)) {
          setComments(data.comments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/post/comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: newComment }),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const commentData = await response.json();
      console.log('New comment created:', commentData);
      setComments(prev => [...prev, commentData.comment]); // ✅ Only the `comment`
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
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
        {(comments || []).map(comment => (
          comment?.createdBy && (
            <div key={comment._id} className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.createdBy.profilePicture} alt={comment.createdBy.username} />
                <AvatarFallback>{comment.createdBy.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">{comment.createdBy.username}</span>
                    <span className="text-xs text-gray-500">@{comment.createdBy.username}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
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
                    <span>{comment.likes?.length || 0}</span>
                  </button>
                  <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
