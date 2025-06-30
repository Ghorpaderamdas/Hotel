import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Drumstick, Plus } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('veg');

  const menuData = {
    veg: [
      { name: 'Paneer Butter Masala', price: 180, description: 'Rich and creamy paneer curry' },
      { name: 'Dal Tadka', price: 120, description: 'Yellow lentils with aromatic spices' },
      { name: 'Veg Biryani', price: 160, description: 'Fragrant basmati rice with mixed vegetables' },
      { name: 'Aloo Gobi', price: 140, description: 'Potato and cauliflower curry' },
      { name: 'Palak Paneer', price: 170, description: 'Spinach curry with cottage cheese' },
      { name: 'Chole Bhature', price: 150, description: 'Spicy chickpeas with fried bread' },
      { name: 'Veg Pulao', price: 130, description: 'Spiced rice with mixed vegetables' },
      { name: 'Rajma Chawal', price: 140, description: 'Kidney beans curry with rice' },
    ],
    nonveg: [
      { name: 'Chicken Biryani', price: 220, description: 'Aromatic basmati rice with tender chicken' },
      { name: 'Butter Chicken', price: 250, description: 'Creamy tomato-based chicken curry' },
      { name: 'Mutton Curry', price: 280, description: 'Spicy goat meat curry' },
      { name: 'Fish Fry', price: 200, description: 'Crispy fried fish with spices' },
      { name: 'Chicken Tikka', price: 180, description: 'Grilled chicken pieces with spices' },
      { name: 'Egg Curry', price: 120, description: 'Boiled eggs in spicy gravy' },
      { name: 'Chicken 65', price: 190, description: 'Spicy fried chicken appetizer' },
      { name: 'Prawn Curry', price: 260, description: 'Fresh prawns in coconut curry' },
    ],
    extras: [
      { name: 'Roti/Chapati', price: 15, description: 'Fresh wheat flatbread' },
      { name: 'Naan', price: 25, description: 'Leavened flatbread' },
      { name: 'Jeera Rice', price: 80, description: 'Cumin flavored basmati rice' },
      { name: 'Papad', price: 20, description: 'Crispy lentil wafer' },
      { name: 'Raita', price: 40, description: 'Yogurt with cucumber and spices' },
      { name: 'Pickle', price: 30, description: 'Assorted Indian pickles' },
      { name: 'Gulab Jamun', price: 60, description: 'Sweet milk dumplings in syrup' },
      { name: 'Ice Cream', price: 50, description: 'Vanilla/Chocolate/Strawberry' },
    ]
  };

  const categories = [
    { id: 'veg', name: 'Vegetarian', icon: <Leaf className="h-5 w-5" />, color: 'green' },
    { id: 'nonveg', name: 'Non-Vegetarian', icon: <Drumstick className="h-5 w-5" />, color: 'red' },
    { id: 'extras', name: 'Extras & Desserts', icon: <Plus className="h-5 w-5" />, color: 'amber' },
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
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of authentic Indian cuisine, 
            made with fresh ingredients and traditional recipes.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? `bg-${category.color}-100 text-${category.color}-700`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {menuData[activeCategory as keyof typeof menuData].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <span className="text-lg font-bold text-amber-600">₹{item.price}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition-colors"
              >
                Add to Order
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-white rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Order?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us to place your order or visit our restaurant for a delightful dining experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              WhatsApp Order
            </button>
            <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Call Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Menu;