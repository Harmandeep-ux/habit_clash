import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { Bell } from "lucide-react";

import { motion } from 'framer-motion';
import axiosInstance from '../api/api';

const Navbar = () => {
  const [inviteCount, setInviteCount] = useState(0);

  
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {

  const fetchInvites = async () => {
    try {
      const { data } = await axiosInstance.get("/challenge/my-invites");
      setInviteCount(data.length);
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticated) {
    fetchInvites();
  }
}, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      className="bg-gray-900/80 backdrop-blur-sm border-b border-orange-500/20 px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/home" className="flex items-center space-x-2">
          <motion.span 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
            whileHover={{ scale: 1.05 }}
          >
            Habit Clash
          </motion.span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/home" 
            className="text-orange-200 hover:text-yellow-400 transition-colors"
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className="text-orange-200 hover:text-yellow-400 transition-colors"
            >
              Dashboard
            </Link>
          )}

          <Link 
            to="/leaderboard" 
            className="text-orange-200 hover:text-yellow-400 transition-colors"
          >
            Leaderboard
          </Link>
        </div>
      
      {isAuthenticated && (
  <button
    onClick={() => navigate("/invites")}
    className="relative text-orange-200 hover:text-yellow-400 transition-colors"
  >
    <Bell size={22} />
    {inviteCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {inviteCount}
      </span>
    )}
  </button>
)}
   
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <motion.button
              onClick={handleLogout}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-2 px-4 rounded-lg text-sm shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-2 px-4 rounded-lg text-sm shadow-lg"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-gray-800 border border-orange-500 text-orange-200 font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;