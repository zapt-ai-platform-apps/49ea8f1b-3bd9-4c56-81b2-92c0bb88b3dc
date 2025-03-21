import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TodoForm = ({ addTodo, categories }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text, category, priority, dueDate || null);
    setText('');
    setShowOptions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="w-full p-3 box-border rounded-lg shadow-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow cursor-pointer"
          >
            Add
          </motion.button>
        </div>
        
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="text-blue-600 text-sm font-medium cursor-pointer"
          >
            {showOptions ? 'Hide Options' : 'Show Options'}
          </motion.button>
        </div>
        
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 box-border rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                {categories.map((cat) => (
                  !['personal', 'work', 'shopping', 'health'].includes(cat) && (
                    <option key={cat} value={cat}>{cat}</option>
                  )
                ))}
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 box-border rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 box-border rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </motion.div>
        )}
      </div>
    </form>
  );
};

export default TodoForm;