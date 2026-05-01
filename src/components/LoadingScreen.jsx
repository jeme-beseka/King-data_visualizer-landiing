import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'King Data Visualizer';

  useEffect(() => {
    // Check if already loaded this session
    const hasLoaded = sessionStorage.getItem('loadingScreenShown');
    if (hasLoaded) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    // Hide after 2.5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('loadingScreenShown', 'true');
    }, 2500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0D0D1A]"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-24 h-24"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
            />
            <motion.div
              className="text-2xl font-['Orbitron'] font-bold text-amber-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-6 bg-amber-400 ml-1"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
