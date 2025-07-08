import React from 'react';
import { Edit3, Trash2, Flag } from 'lucide-react';

const PostActionsMenu = ({ onClose, isOwner, postId, onDelete }) => {

  const handleEdit = () => {
    console.log('Edit post');
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/post/${postId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          if (onDelete) onDelete();
        } else {
          alert('Failed to delete post');
        }
      } catch (error) {
        alert('Error deleting post');
      }
    }
    onClose();
  };

  const handleReport = () => {
    console.log('Report post');
    onClose();
  };

  return (
    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[150px]">
      {isOwner ? (
        <>
          <button
            onClick={handleEdit}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Edit3 size={14} />
            Edit Post
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Post
          </button>
        </>
      ) : (
        <button
          onClick={handleReport}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <Flag size={14} />
          Report Post
        </button>
      )}
    </div>
  );
};

export default PostActionsMenu;
