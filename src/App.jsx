import React from 'react';
import { motion } from 'framer-motion';
import TodoList from './components/TodoList';
import Assistant from './components/Assistant';
import useTodos from './hooks/useTodos';

const App = () => {
  const { todos } = useTodos();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 py-8 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TaskMaster AI</h1>
          <p className="text-gray-600">Stay organized with a smarter to-do list</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <TodoList />
        </motion.div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            Made on ZAPT
          </a>
        </div>
      </div>
      
      <Assistant todos={todos} />
    </div>
  );
};

export default App;