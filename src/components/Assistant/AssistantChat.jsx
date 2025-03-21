import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from 'react-icons/fa';

const AssistantChat = ({ isOpen, messages, sendMessage, closeAssistant, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput('');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-20 right-4 w-full max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white">
            <div className="flex items-center">
              <FaRobot className="mr-2" />
              <h3 className="font-medium">TaskMaster AI Assistant</h3>
            </div>
            <button 
              onClick={closeAssistant}
              className="text-white hover:bg-blue-700 p-1 rounded-full cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Messages */}
          <div className="p-4 overflow-y-auto" style={{ height: '320px' }}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.role === 'user' ? (
                      <>
                        <span className="text-xs font-medium">You</span>
                        <FaUser className="ml-1 text-xs" />
                      </>
                    ) : (
                      <>
                        <FaRobot className="mr-1 text-xs" />
                        <span className="text-xs font-medium">Assistant</span>
                      </>
                    )}
                  </div>
                  <div>
                    {msg.parts[0].text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.parts[0].text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Type your message..."
                className="flex-1 box-border p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`px-4 rounded-r-md cursor-pointer flex items-center justify-center ${
                  isLoading || !input.trim()
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssistantChat;