import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Settings, 
  Users, 
  Camera, 
  Utensils, 
  Bed, 
  CreditCard, 
  Star,
  Lock,
  Crown,
  X,
  FileText
} from 'lucide-react';
import BlogManager from '../../components/admin/BlogManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProModal, setShowProModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const ProModal = () => (
    <AnimatePresence>
      {showProModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowProModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pro Version Required</h2>
              <p className="text-gray-600 mb-6">
                This feature is available in the Pro version of Hotel Management System.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Advanced Room Booking Management
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Payment Gateway Integration
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Multi-language Support
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Advanced Analytics & Reports
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: <Settings className="h-5 w-5" /> },
    { id: 'menu', name: 'Menu Management', icon: <Utensils className="h-5 w-5" /> },
    { id: 'gallery', name: 'Gallery Management', icon: <Camera className="h-5 w-5" /> },
    { id: 'blog', name: 'Blog Manager', icon: <FileText className="h-5 w-5" /> },
    { id: 'rooms', name: 'Room Booking', icon: <Bed className="h-5 w-5" />, locked: true },
    { id: 'payments', name: 'Payment Settings', icon: <CreditCard className="h-5 w-5" />, locked: true },
    { id: 'reviews', name: 'Reviews Management', icon: <Star className="h-5 w-5" />, locked: true },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-800">127</p>
                  </div>
                  <Bed className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Menu Items</p>
                    <p className="text-2xl font-bold text-gray-800">45</p>
                  </div>
                  <Utensils className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gallery Images</p>
                    <p className="text-2xl font-bold text-gray-800">89</p>
                  </div>
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Blog Posts</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'menu':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Management</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Paneer Butter Masala</h3>
                  <p className="text-sm text-gray-600">Vegetarian • ₹180</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Chicken Biryani</h3>
                  <p className="text-sm text-gray-600">Non-Vegetarian • ₹220</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
              </div>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Add New Menu Item
              </button>
            </div>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery Management</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative group">
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Upload New Images
            </button>
          </div>
        );

      case 'blog':
        return <BlogManager />;
      
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Feature Locked</h2>
            <p className="text-gray-600 mb-4">This feature is available in the Pro version.</p>
            <button
              onClick={() => setShowProModal(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Learn More
            </button>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Hotel Kalsubai Gate Point</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.locked) {
                        setShowProModal(true);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    } ${item.locked ? 'opacity-75' : ''}`}
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.locked && <Lock className="h-4 w-4 text-gray-400" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>

      <ProModal />
    </motion.div>
  );
};

export default AdminDashboard;