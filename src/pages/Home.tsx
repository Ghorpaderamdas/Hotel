import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Utensils, Camera, Bed } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Bed className="h-8 w-8" />,
      title: "Comfortable Rooms",
      description: "Clean and cozy accommodations with mountain views"
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Delicious Food",
      description: "Authentic local cuisine and popular dishes"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Scenic Views",
      description: "Breathtaking views of Kalsubai Peak"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Group Friendly",
      description: "Perfect for families and group travelers"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
        <div className="text-center z-10 px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Hotel Kalsubai Gate Point
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Your Gateway to Maharashtra's Highest Peak
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/menu"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              View Menu
            </Link>
            <Link
              to="/contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About Our Hotel
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Located at the base of Kalsubai Peak, Maharashtra's highest summit, our hotel offers 
              the perfect blend of comfort and adventure. Experience authentic hospitality with 
              modern amenities in the heart of nature.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-amber-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-amber-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-amber-100">Rooms Available</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-amber-100">Menu Items</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-amber-100">Happy Guests</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-amber-100 flex items-center justify-center">
                <Star className="h-5 w-5 mr-1" />
                Rating
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Location
            </h2>
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
              <MapPin className="h-5 w-5 text-amber-600" />
              <span>Kalsubai Peak, Akole, Maharashtra</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-96 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                <p className="text-lg">Google Maps integration would be embedded here</p>
                <p className="text-sm mt-2 opacity-75">Kalsubai Peak, Akole, Ahmednagar, Maharashtra 422601</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;