import { useState } from 'react';
import NavbarDash from '../compounts/dashboard/NavbarDash';
import Sidebar from '../compounts/dashboard/Sidebar';
import DashboardContent from '../compounts/DashboardContent'
import Footer from '../compounts/Footer';
const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <NavbarDash />
      
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
