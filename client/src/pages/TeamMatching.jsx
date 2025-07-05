import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../compounts/ui/tabs";
import ProjectTeamsTab from '../compounts/team/teamproject/ProjectTeamsTab';
import HackathonTeamsTab from '../compounts/team/Hackathon/HackathonTeamsTab';
import NavbarDash from '../compounts/dashboard/NavbarDash';
import Sidebar from '../compounts/dashboard/Sidebar';
import Footer from '../compounts/home/Footer';

const TeamMatching = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('Team Matching');
  const [profilePicture, setProfilePicture] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    fetch('http://localhost:5000/dashboard/profile', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setProfilePicture(data.profilePicture))
      .catch(() => setProfilePicture(null));
  }, []);

  return (
    <>
      <NavbarDash profilePicture={profilePicture} />
      <div className="flex">
          <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
      <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Matching</h1>
            <p className="text-gray-600">Find your perfect team or create your own collaboration</p>
          </div>

          <Tabs defaultValue="project-teams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="project-teams" className="flex items-center gap-2">
                🚀 Project Teams
              </TabsTrigger>
              <TabsTrigger value="hackathon-teams" className="flex items-center gap-2">
                🏆 Hackathon Teams
              </TabsTrigger>
            </TabsList>

            <TabsContent value="project-teams">
              <ProjectTeamsTab />
            </TabsContent>

            <TabsContent value="hackathon-teams">
              <HackathonTeamsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default TeamMatching;
