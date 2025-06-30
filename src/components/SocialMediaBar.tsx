import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Menu, X } from 'lucide-react';

const SocialMediaBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      url: 'https://facebook.com/hotelkalsubai',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="h-4 w-4" />,
      url: 'https://instagram.com/hotelkalsubai',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:shadow-pink-500/25'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      url: 'https://linkedin.com/company/hotelkalsubai',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      url: 'https://twitter.com/hotelkalsubai',
      color: 'from-sky-400 to-sky-500',
      hoverColor: 'hover:shadow-sky-500/25'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="h-4 w-4" />,
      url: 'https://youtube.com/@hotelkalsubai',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:shadow-red-500/25'
    }
  ];

  return (
    <>
      {/* Desktop: Top-right horizontal bar */}
      <div className="hidden md:block fixed top-6 right-6 z-40">
        <motion.div
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, staggerChildren: 0.1 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-2 bg-gradient-to-br ${social.color} text-white rounded-full shadow-md hover:shadow-lg ${social.hoverColor} transition-all duration-300`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {social.icon}
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {social.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Mobile: Collapsible button in top-right */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isCollapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </motion.button>

          {/* Expanded Social Icons */}
          <AnimatePresence>
            {isCollapsed && (
              <motion.div
                className="absolute top-16 right-0 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-2 bg-gradient-to-br ${social.color} text-white rounded-full shadow-md hover:shadow-lg ${social.hoverColor} transition-all duration-300`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {social.icon}
                      </motion.div>

                      {/* Mobile Tooltip */}
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {social.name}
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default SocialMediaBar;