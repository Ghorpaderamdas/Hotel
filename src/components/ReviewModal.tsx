import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User, Mail } from 'lucide-react';
import Modal from './Modal';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    review: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Review submitted:', formData);
      alert('Thank you for your review! It will be published after moderation.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 0,
        title: '',
        review: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Write a Review" size="md">
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
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= formData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Review Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Give your review a title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Your Review
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              placeholder="Share your experience with us..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || formData.rating === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Submit Review</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;