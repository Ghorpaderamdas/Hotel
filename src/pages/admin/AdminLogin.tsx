import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Mountain, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { authApi, LoginRequest } from '../../utils/authApi';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('online'); // Default to online
  const navigate = useNavigate();

  // Check backend health on component mount - but don't block the form
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const isHealthy = await authApi.checkBackendHealth();
        setBackendStatus(isHealthy ? 'online' : 'offline');
      } catch (error) {
        console.log('Backend health check failed, but allowing form to work');
        setBackendStatus('online'); // Allow form to work even if health check fails
      }
    };
    
    // Don't block the UI, check in background
    checkBackend();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authApi.login(credentials);
      
      if (response.success) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Network error. Please try again.');
      
      // Update backend status if connection failed
      if (error.message.includes('Unable to connect to server')) {
        setBackendStatus('offline');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page or show modal
    alert('Please contact the system administrator for password reset.');
  };

  const handleRetryConnection = async () => {
    setBackendStatus('checking');
    try {
      const isHealthy = await authApi.checkBackendHealth();
      setBackendStatus(isHealthy ? 'online' : 'offline');
      if (isHealthy) {
        setError('');
      }
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Try to make a simple request to test connection
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'test', password: 'test' }),
        signal: AbortSignal.timeout(5000),
      });
      
      // Even if login fails, if we get a response, backend is working
      setBackendStatus('online');
      setError('Backend connection successful! You can now login.');
    } catch (error: any) {
      setBackendStatus('offline');
      setError('Cannot connect to backend. Please ensure it\'s running on http://localhost:8080');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Mountain className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Hotel Kalsubai Gate Point</p>
        </div>

        {/* Backend Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center space-x-2">
              {backendStatus === 'checking' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
              ) : backendStatus === 'online' ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm font-medium">
                Backend Status: {backendStatus === 'checking' ? 'Checking...' : backendStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="flex space-x-2">
              {backendStatus === 'offline' && (
                <button
                  onClick={handleRetryConnection}
                  className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded hover:bg-amber-200 transition-colors"
                >
                  Retry
                </button>
              )}
              <button
                onClick={handleTestConnection}
                disabled={isLoading}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                Test
              </button>
            </div>
          </div>
        </div>

        {/* Backend Offline Warning */}
        {backendStatus === 'offline' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-orange-800">Backend Server Offline</h3>
                <p className="text-xs text-orange-700 mt-1">
                  The backend server might not be running. Please ensure it's started:
                </p>
                <code className="text-xs bg-orange-100 px-2 py-1 rounded mt-1 block">
                  cd backend && mvn spring-boot:run
                </code>
                <p className="text-xs text-orange-600 mt-1">
                  You can still try to login - the form will work if the backend is actually running.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-lg p-4 mb-6 flex items-center space-x-2 ${
              error.includes('successful') 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}
          >
            <AlertCircle className={`h-5 w-5 ${
              error.includes('successful') ? 'text-green-500' : 'text-red-500'
            }`} />
            <span className={`text-sm ${
              error.includes('successful') ? 'text-green-700' : 'text-red-700'
            }`}>{error}</span>
          </motion.div>
        )}

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-1">Demo Credentials:</h3>
          <p className="text-xs text-blue-600">Username: admin</p>
          <p className="text-xs text-blue-600">Password: admin123</p>
        </div>

        {/* Login Form - Always enabled */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="h-4 w-4 inline mr-1" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10 disabled:bg-gray-100"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Forgot Password?
          </button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            disabled={isLoading}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium disabled:cursor-not-allowed"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;