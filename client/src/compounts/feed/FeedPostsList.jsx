import React, { useEffect, useState } from 'react';
import FeedPostCard from './FeedPostCard';

const FeedPostsList = () => {
  const [posts, setPosts] = useState([]); // ✅ initialize to empty array

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/post/all', {
          credentials: 'include',
        });
        const data = await response.json();
        setPosts(data); // ✅ update state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); // ✅ call inner async
  }, []); // ✅ empty deps = run once on mount

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <FeedPostCard key={post._id} post={post} />
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
