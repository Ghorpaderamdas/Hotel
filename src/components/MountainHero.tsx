import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mountain, Play, Volume2, VolumeX, ArrowRight, MapPin } from 'lucide-react';

const MountainHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const midgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const foregroundY = useTransform(scrollY, [0, 1000], [0, 100]);
  const cloudsY = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Mountain SVG Components
  const BackgroundMountains = () => (
    <svg viewBox="0 0 1200 400" className="absolute bottom-0 w-full h-full">
      <defs>
        <linearGradient id="bgMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0,400 L0,200 L200,150 L400,180 L600,120 L800,160 L1000,100 L1200,140 L1200,400 Z"
        fill="url(#bgMountainGrad)"
      />
    </svg>
  );

  const MidgroundMountains = () => (
    <svg viewBox="0 0 1200 400" className="absolute bottom-0 w-full h-full">
      <defs>
        <linearGradient id="midMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M0,400 L0,250 L150,200 L300,230 L500,170 L700,210 L900,150 L1100,190 L1200,160 L1200,400 Z"
        fill="url(#midMountainGrad)"
      />
    </svg>
  );

  const ForegroundMountains = () => (
    <svg viewBox="0 0 1200 400" className="absolute bottom-0 w-full h-full">
      <defs>
        <linearGradient id="fgMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d="M0,400 L0,300 L100,250 L250,280 L400,220 L600,260 L800,200 L1000,240 L1200,210 L1200,400 Z"
        fill="url(#fgMountainGrad)"
      />
    </svg>
  );

  // Cloud component
  const Cloud = ({ delay, duration, size = 1, opacity = 0.6 }: { delay: number; duration: number; size?: number; opacity?: number }) => (
    <motion.div
      className="absolute"
      style={{
        top: `${Math.random() * 40 + 10}%`,
        transform: `scale(${size})`,
      }}
      animate={{
        x: ['-20%', '120%'],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width="100" height="40" viewBox="0 0 100 40" className={`opacity-${Math.floor(opacity * 100)}`}>
        <path
          d="M20,30 Q10,20 20,15 Q25,5 35,10 Q45,0 55,10 Q70,5 75,15 Q85,10 80,20 Q90,25 80,30 Z"
          fill="white"
          opacity={opacity}
        />
      </svg>
    </motion.div>
  );

  // Bird component
  const Bird = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute"
      style={{
        top: `${Math.random() * 30 + 20}%`,
      }}
      animate={{
        x: ['-10%', '110%'],
        y: [0, -20, 0, -15, 0],
      }}
      transition={{
        x: { duration: 15, delay, repeat: Infinity, ease: "linear" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <svg width="20" height="12" viewBox="0 0 20 12" className="text-white opacity-70">
        <path
          d="M2,6 Q6,2 10,6 Q14,2 18,6 Q14,10 10,6 Q6,10 2,6"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-300 via-pink-300 to-purple-600">
      {/* Animated Sunrise Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 80%, #fbbf24 0%, #f59e0b 20%, #d97706 40%, transparent 70%)',
            'radial-gradient(circle at 50% 70%, #fbbf24 0%, #f59e0b 25%, #d97706 50%, transparent 80%)',
            'radial-gradient(circle at 50% 80%, #fbbf24 0%, #f59e0b 20%, #d97706 40%, transparent 70%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Parallax Mouse Effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <motion.div style={{ y: cloudsY }} className="absolute inset-0">
        <Cloud delay={0} duration={25} size={1.2} opacity={0.8} />
        <Cloud delay={5} duration={30} size={0.8} opacity={0.6} />
        <Cloud delay={10} duration={35} size={1.0} opacity={0.7} />
        <Cloud delay={15} duration={28} size={0.9} opacity={0.5} />
        <Cloud delay={20} duration={32} size={1.1} opacity={0.6} />
      </motion.div>

      {/* Flying Birds */}
      <div className="absolute inset-0">
        <Bird delay={0} />
        <Bird delay={3} />
        <Bird delay={6} />
        <Bird delay={9} />
      </div>

      {/* Mountain Layers with Parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <BackgroundMountains />
      </motion.div>
      
      <motion.div style={{ y: midgroundY }} className="absolute inset-0">
        <MidgroundMountains />
      </motion.div>
      
      <motion.div style={{ y: foregroundY }} className="absolute inset-0">
        <ForegroundMountains />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Animated Mountain Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Mountain className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 80 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block">Welcome to</span>
            <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Kalsubai
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl text-white/90 font-medium">
              Maharashtra's Highest Peak
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-8"
          >
            <p className="text-xl md:text-3xl text-white/90 mb-4 font-light">
              Your Ultimate Trekking Adventure Awaits
            </p>
            <div className="flex items-center justify-center space-x-3 text-amber-300">
              <MapPin className="h-6 w-6" />
              <span className="text-lg">1,646 meters above sea level</span>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="group relative bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-2xl overflow-hidden flex items-center space-x-3"
              >
                <span className="relative z-10">Start Trekking</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/facilities"
                className="group relative bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-2xl overflow-hidden flex items-center space-x-3"
              >
                <Play className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Explore Facilities</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Sound Toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="mt-8 bg-white/10 backdrop-blur-xl text-white p-3 rounded-full hover:bg-white/20 transition-all border border-white/20"
            title={soundEnabled ? "Mute ambient sounds" : "Enable ambient sounds"}
          >
            {soundEnabled ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </motion.button>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};

export default MountainHero;