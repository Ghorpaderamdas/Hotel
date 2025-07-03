import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Calendar, MessageCircle } from 'lucide-react';
import Modal from './Modal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use useCallback to prevent function recreation on every render
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      alert('Thank you for your inquiry! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        message: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onClose]);

  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "+919876543210";
    const message = "Hello! I'm interested in booking a room at Hotel Kalsubai Gate Point. Can you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us" size="lg">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/90">
                  <Phone className="h-5 w-5 text-amber-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <Mail className="h-5 w-5 text-amber-400" />
                  <span>info@hotelkalsubai.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <span>24/7 Reception Available</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              type="button"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp</span>
            </motion.button>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="" className="bg-gray-800">Select guests</option>
                    <option value="1" className="bg-gray-800">1 Guest</option>
                    <option value="2" className="bg-gray-800">2 Guests</option>
                    <option value="3" className="bg-gray-800">3 Guests</option>
                    <option value="4" className="bg-gray-800">4 Guests</option>
                    <option value="5+" className="bg-gray-800">5+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your requirements, special requests, or any questions you have..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;