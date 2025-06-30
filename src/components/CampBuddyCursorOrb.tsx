import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Compass, Tent, X, Sparkles } from 'lucide-react';
import FAQModal from './FAQModal';
import CampingInfoModal from './CampingInfoModal';

const CampBuddyCursorOrb = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showCampInfo, setShowCampInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Motion values for smooth cursor following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth trailing motion
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150, mass: 0.5 });
  
  const orbRef = useRef<HTMLDivElement>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse movement with cursor following
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Calculate offset position (5-10% offset from cursor)
      const offsetX = clientX + 60; // 60px offset to the right
      const offsetY = clientY + 30; // 30px offset down
      
      // Respect screen boundaries
      const buttonSize = 64; // 16 * 4 (w-16 h-16)
      const margin = 20;
      
      const boundedX = Math.max(
        margin, 
        Math.min(windowSize.width - buttonSize - margin, offsetX)
      );
      const boundedY = Math.max(
        margin, 
        Math.min(windowSize.height - buttonSize - margin, offsetY)
      );
      
      mouseX.set(boundedX);
      mouseY.set(boundedY);
    };

    // Handle mouse leave to hide orb
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Handle mouse enter to show orb
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, windowSize]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
        setShowFAQ(false);
        setShowCampInfo(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOptionClick = (option: 'faq' | 'camp') => {
    setIsExpanded(false);
    if (option === 'faq') {
      setShowFAQ(true);
    } else {
      setShowCampInfo(true);
    }
  };

  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Fallback to fixed position for users who prefer reduced motion
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <CampBuddyButtonContent 
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          handleOptionClick={handleOptionClick}
          showFAQ={showFAQ}
          setShowFAQ={setShowFAQ}
          showCampInfo={showCampInfo}
          setShowCampInfo={setShowCampInfo}
        />
      </div>
    );
  }

  return (
    <>
      {/* Cursor Following Orb */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={orbRef}
            className="fixed z-50 pointer-events-none"
            style={{
              x: springX,
              y: springY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Magical Trail Effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
                ],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Orb Container */}
            <div className="relative pointer-events-auto">
              <CampBuddyButtonContent 
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                handleOptionClick={handleOptionClick}
                showFAQ={showFAQ}
                setShowFAQ={setShowFAQ}
                showCampInfo={showCampInfo}
                setShowCampInfo={setShowCampInfo}
                isFloating={true}
              />
            </div>

            {/* Floating Particles */}
            <motion.div
              className="absolute -inset-8 pointer-events-none"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                    left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
      <CampingInfoModal isOpen={showCampInfo} onClose={() => setShowCampInfo(false)} />
    </>
  );
};

// Extracted button content component for reusability
interface CampBuddyButtonContentProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  handleOptionClick: (option: 'faq' | 'camp') => void;
  showFAQ: boolean;
  setShowFAQ: (show: boolean) => void;
  showCampInfo: boolean;
  setShowCampInfo: (show: boolean) => void;
  isFloating?: boolean;
}

const CampBuddyButtonContent: React.FC<CampBuddyButtonContentProps> = ({
  isExpanded,
  setIsExpanded,
  handleOptionClick,
  showFAQ,
  setShowFAQ,
  showCampInfo,
  setShowCampInfo,
  isFloating = false
}) => {
  return (
    <motion.div
      className="relative"
      animate={!isFloating ? {
        y: [0, -8, 0],
      } : {}}
      transition={!isFloating ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      {/* Magical Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-75 blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sparkle Particles */}
      <motion.div
        className="absolute -inset-4"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}px`,
              left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 30}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden group"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(147, 51, 234, 0.4)",
            "0 0 40px rgba(147, 51, 234, 0.6)",
            "0 0 20px rgba(147, 51, 234, 0.4)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
        
        {/* Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Sparkles className="h-6 w-6" />
          )}
        </motion.div>

        {/* Hover Sparkles */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.button>

      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-20 right-0 space-y-3"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            {/* FAQ Option */}
            <motion.button
              onClick={() => handleOptionClick('faq')}
              className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                x: -5,
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Compass className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="font-medium whitespace-nowrap">FAQ</span>
            </motion.button>

            {/* Camping Info Option */}
            <motion.button
              onClick={() => handleOptionClick('camp')}
              className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                x: -5,
                boxShadow: "0 10px 25px rgba(249, 115, 22, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Tent className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium whitespace-nowrap">Trekking & Camping</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CampBuddyCursorOrb;