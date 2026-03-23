import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Youtube, 
  Instagram, 
  User, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/dashboard/youtube', label: 'YouTube Analytics', icon: Youtube },
    { path: '/dashboard/instagram', label: 'Instagram Analytics', icon: Instagram },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CM</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Creator-Mitra</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="sidebar-link sidebar-link-inactive w-full justify-start"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
