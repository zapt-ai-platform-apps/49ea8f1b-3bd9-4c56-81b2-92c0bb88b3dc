import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaCheck, FaClock, FaFlag } from 'react-icons/fa';

const priorityColors = {
  high: 'bg-red-100 border-red-300 text-red-800',
  medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  low: 'bg-green-100 border-green-300 text-green-800',
};

const categoryIcons = {
  personal: '👤',
  work: '💼',
  shopping: '🛒',
  health: '🏥',
  other: '📌',
};

const TodoItem = ({ todo, toggleTodo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  
  const handleUpdate = () => {
    if (!text.trim()) return;
    updateTodo(todo.id, { text });
    setIsEditing(false);
  };
  
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  const isOverdue = () => {
    if (!todo.dueDate) return false;
    return new Date(todo.dueDate) < new Date() && !todo.completed;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.01 }}
      className={`p-4 mb-3 rounded-lg border shadow-sm ${
        todo.completed 
          ? 'bg-gray-50 border-gray-200 opacity-75' 
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleTodo(todo.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 cursor-pointer ${
              todo.completed
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-gray-300'
            }`}
          >
            {todo.completed && <FaCheck size={12} />}
          </motion.button>
          
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleUpdate}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
              className="flex-1 p-1 box-border border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoFocus
            />
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <span className={`mr-2 ${categoryIcons[todo.category] ? '' : 'hidden'}`}>
                  {categoryIcons[todo.category] || categoryIcons.other}
                </span>
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.text}
                </span>
              </div>
              
              <div className="flex mt-1 text-xs gap-2">
                {todo.priority && (
                  <span 
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}
                  >
                    <FaFlag className="mr-1" size={10} />
                    {todo.priority}
                  </span>
                )}
                
                {todo.dueDate && (
                  <span 
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      isOverdue() 
                        ? 'bg-red-100 text-red-800 border border-red-300' 
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    <FaClock className="mr-1" size={10} />
                    {formatDueDate(todo.dueDate)}
                    {isOverdue() && ' (overdue)'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
          >
            <FaEdit />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-500 hover:text-red-500 cursor-pointer"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;