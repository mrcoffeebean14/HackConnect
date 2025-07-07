
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Image, Link, Github, X } from 'lucide-react';

const CreatePostBox = () => {
  const [postText, setPostText] = useState('');
  const [attachedLink, setAttachedLink] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handlePost = () => {
    if (!postText.trim()) return;
    
    // Handle post creation logic here
    console.log('Creating post:', { postText, attachedLink });
    
    // Reset form
    setPostText('');
    setAttachedLink('');
    setShowLinkInput(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/api/placeholder/40/40" alt="Your avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="What's on your mind? Share your latest project, idea, or collaboration opportunity..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="min-h-[100px] resize-none border-0 p-0 text-base focus-visible:ring-0"
          />
          
          {showLinkInput && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Link size={16} className="text-gray-400" />
              <input
                type="url"
                placeholder="Add a link or GitHub repository URL..."
                value={attachedLink}
                onChange={(e) => setAttachedLink(e.target.value)}
                className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
              />
              <button
                onClick={() => setShowLinkInput(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Image size={20} />
                <span className="text-sm">Photo</span>
              </button>
              
              <button
                onClick={() => setShowLinkInput(!showLinkInput)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Link size={20} />
                <span className="text-sm">Link</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Github size={20} />
                <span className="text-sm">GitHub</span>
              </button>
            </div>
            
            <Button
              onClick={handlePost}
              disabled={!postText.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostBox;
