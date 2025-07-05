import { useState, useEffect } from 'react';
import NavbarDash from '../compounts/dashboard/NavbarDash';
import Sidebar from '../compounts/dashboard/Sidebar';
import DashboardContent from '../compounts/dashboard/DashboardContent'
import Footer from '../compounts/home/Footer';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/dashboard/profile', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setProfilePicture(data.profilePicture))
      .catch(() => setProfilePicture(null));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <NavbarDash profilePicture={profilePicture} />
      
      <div className="flex">
        <Sidebar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <DashboardContent />
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
