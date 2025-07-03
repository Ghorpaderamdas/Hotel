import React, { createContext, useContext, useState, useCallback } from 'react';
import ContactModal from './ContactModal';
import ReviewModal from './ReviewModal';
import FeedbackModal from './FeedbackModal';

interface ModalContextType {
  openContactModal: () => void;
  openReviewModal: () => void;
  openFeedbackModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState({
    contact: false,
    review: false,
    feedback: false
  });

  const openContactModal = useCallback(() => {
    setModals(prev => ({ ...prev, contact: true }));
  }, []);

  const openReviewModal = useCallback(() => {
    setModals(prev => ({ ...prev, review: true }));
  }, []);

  const openFeedbackModal = useCallback(() => {
    setModals(prev => ({ ...prev, feedback: true }));
  }, []);

  const closeContactModal = useCallback(() => {
    setModals(prev => ({ ...prev, contact: false }));
  }, []);

  const closeReviewModal = useCallback(() => {
    setModals(prev => ({ ...prev, review: false }));
  }, []);

  const closeFeedbackModal = useCallback(() => {
    setModals(prev => ({ ...prev, feedback: false }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals({
      contact: false,
      review: false,
      feedback: false
    });
  }, []);

  const contextValue: ModalContextType = {
    openContactModal,
    openReviewModal,
    openFeedbackModal,
    closeAllModals
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      
      {/* Render all modals */}
      <ContactModal isOpen={modals.contact} onClose={closeContactModal} />
      <ReviewModal isOpen={modals.review} onClose={closeReviewModal} />
      <FeedbackModal isOpen={modals.feedback} onClose={closeFeedbackModal} />
    </ModalContext.Provider>
  );
};