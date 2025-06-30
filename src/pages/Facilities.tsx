import React from 'react';
import { motion } from 'framer-motion';
import { 
  Tent, 
  Bath, 
  Flame, 
  Music, 
  Wifi, 
  Car, 
  MapPin, 
  Coffee,
  Shield,
  Clock,
  Users,
  Mountain
} from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      icon: <Tent className="h-12 w-12" />,
      title: "Camping Facility",
      description: "Enjoy outdoor camping with proper tents and camping equipment provided",
      features: ["Weather-resistant tents", "Camping mattresses", "Group camping areas", "Guided camping tours"]
    },
    {
      icon: <Bath className="h-12 w-12" />,
      title: "Clean Washrooms",
      description: "Modern, clean washroom facilities with hot water available 24/7",
      features: ["Hot water supply", "Western & Indian toilets", "Clean & sanitized", "Separate male/female"]
    },
    {
      icon: <Flame className="h-12 w-12" />,
      title: "Bonfire Setup",
      description: "Cozy bonfire arrangements for evening entertainment and warmth",
      features: ["Evening bonfire", "Seating arrangement", "Music & stories", "Marshmallow roasting"]
    },
    {
      icon: <Music className="h-12 w-12" />,
      title: "Entertainment",
      description: "Various entertainment options including music, games, and cultural programs",
      features: ["Live music", "Indoor games", "Cultural events", "Group activities"]
    },
    {
      icon: <Wifi className="h-12 w-12" />,
      title: "Free WiFi",
      description: "Complimentary high-speed internet access throughout the property",
      features: ["High-speed internet", "24/7 connectivity", "Multiple access points", "No data limits"]
    },
    {
      icon: <Car className="h-12 w-12" />,
      title: "Parking",
      description: "Secure parking facility for cars, bikes, and other vehicles",
      features: ["Secure parking", "24/7 security", "Car & bike parking", "CCTV monitoring"]
    },
    {
      icon: <Coffee className="h-12 w-12" />,
      title: "Restaurant",
      description: "In-house restaurant serving delicious local and Indian cuisine",
      features: ["Multi-cuisine menu", "Fresh ingredients", "Vegetarian options", "Room service available"]
    },
    {
      icon: <Mountain className="h-12 w-12" />,
      title: "Trekking Guide",
      description: "Professional trekking guides for Kalsubai Peak and nearby trails",
      features: ["Experienced guides", "Safety equipment", "Route planning", "Group trekking"]
    }
  ];

  const additionalServices = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "24/7 Security",
      description: "Round-the-clock security for your safety and peace of mind"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Reception",
      description: "Our reception desk is always available to assist you"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Group Bookings",
      description: "Special arrangements and discounts for group bookings"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Tours",
      description: "Guided tours to nearby attractions and scenic spots"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-amber-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Facilities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all the amenities and services we offer to make your stay 
            comfortable and memorable at Hotel Kalsubai Gate Point.
          </p>
        </motion.div>

        {/* Main Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-amber-600 mb-4 flex justify-center">
                {facility.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                {facility.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {facility.description}
              </p>
              <ul className="space-y-2">
                {facility.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-amber-50 rounded-lg"
              >
                <div className="text-amber-600 mb-3 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-amber-100">
                Located at the base of Kalsubai Peak, Maharashtra's highest summit
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Authentic Experience</h3>
              <p className="text-amber-100">
                Experience genuine Maharashtrian hospitality and local culture
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Adventure Ready</h3>
              <p className="text-amber-100">
                Perfect base for trekking, camping, and exploring the Sahyadri mountains
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Facilities;