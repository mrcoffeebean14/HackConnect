
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Image, Link, Github, X, ImageOff } from 'lucide-react';
import  useIsOwner from '../../hooks/useAuth'

const CreatePostBox = () => {
  const [postText, setPostText] = useState('');
  const [attachedLink, setAttachedLink] = useState('');
  const [GitLink, setGitLink] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showGitLinkInput, setShowGitLinkInput] = useState(false);
  const {user} = useIsOwner();


  const handlePost = async () => {

    if (!postText.trim()) return;
    // Handle post creation logic here
    const postData = {
      content: postText,
      link: attachedLink,
      Gitlink: GitLink,
    };

    try {
      const res = await fetch('http://localhost:5000/post/create', {
        method: 'POSt',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(postData)
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
    console.log('Creating post:', { postText, attachedLink });
    // Reset state after posting
    setPostText(''); // Clear post text
    setAttachedLink(''); // Clear attached link
    setGitLink(''); // Clear GitHub link
    setShowLinkInput(false); // Hide link input if it was open  
    // Optionally, you can also show a success message or update the UI to reflect the new post
    // For example, you might want to call a function to refresh the post list or update      
    // Reset form

  };


  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex gap-4">
      {user && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.profilePicture} alt={user.username} />
            <AvatarFallback>{user.username?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>)}

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
                placeholder="Add a Demo link  URL..."
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
          {showGitLinkInput && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Link size={16} className="text-gray-400" />
              <input
                type="url"
                placeholder="Add a GitHub repository URL..."
                value={GitLink}
                onChange={(e) => setGitLink(e.target.value)}
                className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
              />
              <button
                onClick={() => setShowGitLinkInput(false)}
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

              <button
                onClick={() => setShowGitLinkInput(!showGitLinkInput)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
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
