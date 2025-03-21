import React from 'react';
import { motion } from 'framer-motion';

const TodoFilter = ({ filter, setFilter, categories }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <FilterButton 
          label="All" 
          isActive={filter === 'all'} 
          onClick={() => setFilter('all')} 
        />
        <FilterButton 
          label="Active" 
          isActive={filter === 'active'} 
          onClick={() => setFilter('active')} 
        />
        <FilterButton 
          label="Completed" 
          isActive={filter === 'completed'} 
          onClick={() => setFilter('completed')} 
        />
        <FilterButton 
          label="High Priority" 
          isActive={filter === 'priority'} 
          onClick={() => setFilter('priority')} 
        />
      </div>
      
      {categories.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Filter by category:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <FilterButton 
                key={category}
                label={category} 
                isActive={filter === `category:${category}`} 
                onClick={() => setFilter(`category:${category}`)} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </motion.button>
  );
};

export default TodoFilter;