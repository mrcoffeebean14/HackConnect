import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Features', path: '#features' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' }
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">{/* Main navbar container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">{/* Adjusted padding here */}
        <div className="flex justify-between items-center h-16">{/* Flex container for logo and navigation */}
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">{/* Logo container */}
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">{/* Logo graphic */}
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HackConnect</span>{/* Logo text */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">{/* Desktop navigation container (hidden on mobile) */}
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-600 hover:text-blue-600 transition-colors font-medium ${
                  isActive(item.path) ? 'text-blue-600' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4">{/* Auth buttons container */}
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium" //{/* Login link */}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-medium" //{/* Register button */}
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">//Mobile nav dropdown container
            <div className="flex flex-col space-y-3"> //Mobile nav items container
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2 ${ //Mobile nav button 
                    isActive(item.path) ? 'text-blue-600' : ''
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
