import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import Modal from './Modal';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    feedback: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      console.log('Feedback submitted:', formData);
      alert('Thank you for your feedback! We appreciate your input.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        feedback: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Feedback" size="md">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Your Name
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

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <MessageSquare className="h-4 w-4 inline mr-1" />
              Feedback Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="" className="bg-gray-800">Select category</option>
              <option value="service" className="bg-gray-800">Service Quality</option>
              <option value="food" className="bg-gray-800">Food & Dining</option>
              <option value="rooms" className="bg-gray-800">Room & Accommodation</option>
              <option value="facilities" className="bg-gray-800">Facilities</option>
              <option value="staff" className="bg-gray-800">Staff Behavior</option>
              <option value="website" className="bg-gray-800">Website Experience</option>
              <option value="other" className="bg-gray-800">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Brief subject of your feedback"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Your Feedback
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              placeholder="Please share your detailed feedback..."
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
                <span>Send Feedback</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </Modal>
  );
};

export default FeedbackModal;