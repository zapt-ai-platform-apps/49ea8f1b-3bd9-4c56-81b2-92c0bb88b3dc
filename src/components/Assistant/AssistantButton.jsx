import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

const AssistantButton = ({ openAssistant, isOpen }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={openAssistant}
      disabled={isOpen}
      className={`fixed bottom-4 right-4 w-12 h-12 rounded-full shadow-lg cursor-pointer flex items-center justify-center z-50 ${
        isOpen ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      <FaRobot className="text-white text-xl" />
    </motion.button>
  );
};

export default AssistantButton;