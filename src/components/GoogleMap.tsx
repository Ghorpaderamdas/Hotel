import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation, Phone, Clock } from 'lucide-react';

const GoogleMap = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Hotel coordinates
  const hotelLocation = {
    lat: 19.6007,
    lng: 73.7124,
    name: "Hotel Kalsubai Gate Point",
    address: "Near Kalsubai Peak Base, Akole, Ahmednagar, Maharashtra 422601"
  };

  // Google Maps URLs
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotelLocation.lat},${hotelLocation.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hotelLocation.lat},${hotelLocation.lng}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123456789!2d${hotelLocation.lng}!3d${hotelLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDM2JzAyLjUiTiA3M8KwNDInNDQuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const openInGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  const getDirections = () => {
    window.open(directionsUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-white/20 p-2 rounded-full"
            >
              <MapPin className="h-6 w-6" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">Our Location</h3>
              <p className="text-emerald-100 text-sm">Click to explore on Google Maps</p>
            </div>
          </div>
          <motion.button
            onClick={openInGoogleMaps}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-emerald-100 to-teal-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-white text-center"
            >
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Interactive Map Loading...</h3>
              <p className="text-lg opacity-90">Discover our magical location</p>
            </motion.div>
          </div>
        )}

        {/* Google Maps Embed */}
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleMapLoad}
          className="absolute inset-0"
          title="Hotel Kalsubai Gate Point Location"
        />

        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <motion.button
            onClick={getDirections}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Get Directions"
          >
            <Navigation className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            onClick={openInGoogleMaps}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Open in Google Maps"
          >
            <ExternalLink className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Location Details */}
      <div className="p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800">{hotelLocation.name}</h4>
            <p className="text-gray-600 text-sm">{hotelLocation.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-medium text-gray-800">Contact</p>
              <p className="text-gray-600 text-sm">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-medium text-gray-800">Open 24/7</p>
              <p className="text-gray-600 text-sm">Always welcoming guests</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <motion.button
            onClick={getDirections}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <Navigation className="h-5 w-5" />
            <span>Get Directions</span>
          </motion.button>

          <motion.button
            onClick={openInGoogleMaps}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <MapPin className="h-5 w-5" />
            <span>View on Maps</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GoogleMap;