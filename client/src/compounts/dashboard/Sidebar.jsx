import React from 'react';
import {
  Home,
  UserCircle,
  FolderOpen,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../useLogout';

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed, activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = useLogout();
  

  const sidebarItems = [
    { icon: Home, label: 'Home' },
    { icon: UserCircle, label: 'My Profile' },
    { icon: FolderOpen, label: 'My Projects' },
    { icon: Users, label: 'Team Matching' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Logout', onClick: handleLogout }, // <- logout handler here
  ];

  const handleSidebarItemClick = (label, onClick) => {
    if (label === 'Logout') {
      onClick?.();
    } else {
      setActiveSection(label);
    }
  };

  return (
    <div
      className={`${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 bg-white/60 backdrop-blur-sm border-r border-slate-200/60 min-h-screen flex flex-col`}
    >
      {/* Collapse Button */}
      <div className="p-4">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-100 w-full flex items-center justify-center"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 space-y-1">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.label;

          return (
            <button
              key={index}
              onClick={() => handleSidebarItemClick(item.label, item.onClick)}
              className={`group flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
              {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
