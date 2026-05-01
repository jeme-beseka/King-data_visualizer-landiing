import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: RiCheckLine,
    error: RiErrorWarningLine,
    info: RiInformationLine,
  };

  const colors = {
    success: 'bg-green-500/20 border-green-500/50 text-green-400',
    error: 'bg-red-500/20 border-red-500/50 text-red-400',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-8 right-8 z-[10001] flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${colors[type]}`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
