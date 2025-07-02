import {
  Bell,
  MessageSquare,
  User,
  Search,
  Settings,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import useLogout from '../useLogout';

const NavbarDash = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const uselogout = useLogout();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HC</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HackConnect
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search teammates, projects, hackathons..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-200 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          <button className="relative p-2 rounded-full hover:bg-slate-100">
            <Bell className="w-5 h-5 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>

          <button className="relative p-2 rounded-full hover:bg-slate-100">
            <MessageSquare className="w-5 h-5 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
          </button>

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              className="h-8 w-8 rounded-full overflow-hidden border hover:ring-2 hover:ring-slate-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="/api/placeholder/32/32"
                alt="User"
                className="h-full w-full object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <div
                  className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="w-4 h-4 mr-2 text-slate-600" />
                  <span className="text-sm text-slate-700">Profile</span>
                </div>
                <div
                  className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-2 text-slate-600" />
                  <span className="text-sm text-slate-700">Settings</span>
                </div>
                <hr className="border-slate-200 my-1" />
                <div
                  className="flex items-center px-4 py-2 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <LogOut className="w-4 h-4 mr-2 text-slate-600" />
                  <button onClick={uselogout}><span className="text-sm text-slate-700">Log out</span></button> 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDash;
