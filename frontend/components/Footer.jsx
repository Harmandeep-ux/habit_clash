import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-orange-500/20 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <motion.div 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
              whileHover={{ scale: 1.05 }}
            >
              Habit Clash
            </motion.div>
            <p className="text-orange-200 text-sm">
              Build streaks. Challenge friends. Become unstoppable.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-orange-400 font-medium mb-3">Contact</h4>
            <ul className="space-y-2">
              <li className="text-orange-200 text-sm">
                sahotaharman59111@gmail.com
              </li>
              <li className="text-orange-200 text-sm">
                Punjab, India
              </li>
              <li className="text-orange-200 text-sm">
                © 2025 Harman Sahota
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-orange-400 font-medium mb-3">Connect</h4>
            <div className="flex space-x-4">
              {['twitter', 'instagram', 'github'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-orange-300 hover:text-yellow-400 text-xl"
                  whileHover={{ y: -3 }}
                >
                  <i className={`fab fa-${social}`} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Credits and Legal */}
        <div className="border-t border-orange-500/20 pt-6">
          <p className="text-orange-300 text-xs text-center">
            Made with ❤️ by Harman Sahota in Punjab, India • © {currentYear} Habit Clash
          </p>
          <p className="text-orange-300 text-xs text-center mt-2">
            All rights reserved • Habit Clash is a registered trademark
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;