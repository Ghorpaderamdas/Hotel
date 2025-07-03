import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star, Send } from 'lucide-react';
import { useModal } from './ModalProvider';

const QuickActionButtons = () => {
  const { openContactModal, openReviewModal, openFeedbackModal } = useModal();

  const buttons = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'Contact Us',
      onClick: openContactModal,
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: 'Write Review',
      onClick: openReviewModal,
      gradient: 'from-yellow-500 to-orange-500',
      hoverGradient: 'from-yellow-600 to-orange-600'
    },
    {
      icon: <Send className="h-5 w-5" />,
      label: 'Send Feedback',
      onClick: openFeedbackModal,
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700'
    }
  ];

  return (
    <div className="fixed bottom-20 left-6 z-40 space-y-3">
      {buttons.map((button, index) => (
        <motion.button
          key={button.label}
          onClick={button.onClick}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          whileHover={{ 
            scale: 1.05,
            x: 5,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          className={`group flex items-center space-x-3 bg-gradient-to-r ${button.gradient} hover:${button.hoverGradient} text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300`}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {button.icon}
          </motion.div>
          <span className="font-medium whitespace-nowrap">{button.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActionButtons;