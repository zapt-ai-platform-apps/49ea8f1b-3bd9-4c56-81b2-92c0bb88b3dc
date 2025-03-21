import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import useTodos from '../../hooks/useTodos';

const TodoList = () => {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    updateTodo, 
    deleteTodo,
    filter,
    setFilter,
    categories
  } = useTodos();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <TodoForm addTodo={addTodo} categories={categories} />
      
      <TodoFilter 
        filter={filter} 
        setFilter={setFilter} 
        categories={categories} 
      />
      
      <AnimatePresence mode="popLayout">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p className="text-gray-600">No tasks found. Add some!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;