
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui//label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Camera, MapPin, User } from 'lucide-react';

const ProfileHeader = ({ profileData, updateProfileData }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        updateProfileData('profilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Profile Picture Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage 
                src={imagePreview || profileData.profilePicture} 
                alt={profileData.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {profileData.name ? getInitials(profileData.name) : <User className="w-8 h-8" />}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute bottom-4 right-0">
              <label htmlFor="profile-picture" className="cursor-pointer">
                <div className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                  <Camera className="w-4 h-4" />
                </div>
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 mb-4">
            Click the camera icon to upload a new photo
          </p>
        </div>

        {/* Basic Info Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name *
            </Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => updateProfileData('name', e.target.value)}
              placeholder="Enter your full name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bio" className="text-sm font-medium text-slate-700">
              Bio * ({profileData.bio.length}/250)
            </Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => updateProfileData('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              maxLength={250}
              rows={4}
              className="mt-1 resize-none"
            />
            <p className="text-sm text-slate-500 mt-1">
              Describe your experience, interests, and what you're looking for in a team.
            </p>
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium text-slate-700">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </Label>
            <Input
              id="location"
              value={profileData.location}
              onChange={(e) => updateProfileData('location', e.target.value)}
              placeholder="City, State/Country"
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
