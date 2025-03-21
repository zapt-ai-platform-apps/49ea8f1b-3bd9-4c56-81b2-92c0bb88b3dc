import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTodos, saveTodos } from '../utils/storage';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text, category = 'personal', priority = 'medium', dueDate = null) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      category,
      priority,
      dueDate,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, updates) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'priority') return todo.priority === 'high';
    if (filter.startsWith('category:')) {
      const category = filter.split(':')[1];
      return todo.category === category;
    }
    return true;
  });

  const categories = [...new Set(todos.map((todo) => todo.category))];

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    filter,
    setFilter,
    categories,
  };
};

export default useTodos;