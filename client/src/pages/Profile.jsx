import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';
import ProfileHeader from '../compounts/profile/ProfileHeader';
import SkillsSection from '../compounts/profile/SkillsSection';
import SocialLinksSection from '../compounts/profile/SocialLinksSection';
import InterestsSection from '../compounts/profile/InterestsSection';
import ProfileActions from '../compounts/profile/ProfileActions';
import NavbarDash from '../compounts/dashboard/NavbarDash';
import Footer from '../compounts/Footer';
import Sidebar from '../compounts/dashboard/Sidebar';

const Profile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('My Profile');

  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    location: '',
    profilePicture: null,
    skills: [],
    interests: '',
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    }
  });

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const mockData = {
          name: 'John Doe',
          bio: 'Full-stack developer passionate about hackathons and building innovative solutions.',
          location: 'San Francisco, CA',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design'],
          interests: 'AI, Web3, Sustainability, Gaming',
          socials: {
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
            twitter: 'https://twitter.com/johndoe',
            website: 'https://johndoe.dev'
          }
        };

        setProfileData(mockData);
        setOriginalData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data.',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  const updateProfileData = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSocialData = (platform, value) => {
    setProfileData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handleSave = async () => {
    if (!profileData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name is required.',
        variant: 'destructive'
      });
      return;
    }

    if (!profileData.bio.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Bio is required.',
        variant: 'destructive'
      });
      return;
    }

    if (profileData.bio.length > 250) {
      toast({
        title: 'Validation Error',
        description: 'Bio must be 250 characters or less.',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOriginalData(profileData);
      toast({
        title: 'Success!',
        description: 'Profile updated successfully.'
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save profile changes.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    toast({
      title: 'Changes Cancelled',
      description: 'All changes have been reverted.'
    });
  };

  const hasChanges = JSON.stringify(profileData) !== JSON.stringify(originalData);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavbarDash />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Profile Content */}
        <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">My Profile</h1>
              <p className="text-slate-600">Manage your hackathon profile and connect with teammates</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <ProfileHeader profileData={profileData} updateProfileData={updateProfileData} />
              </div>

              <div className="lg:col-span-2 space-y-6">
                <SkillsSection
                  skills={profileData.skills}
                  updateSkills={(skills) => updateProfileData('skills', skills)}
                />
                <InterestsSection
                  interests={profileData.interests}
                  updateInterests={(interests) => updateProfileData('interests', interests)}
                />
                <SocialLinksSection
                  socials={profileData.socials}
                  updateSocialData={updateSocialData}
                />
              </div>
            </div>

            <ProfileActions
              hasChanges={hasChanges}
              saving={saving}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
