export const getTodos = () => {
  try {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error getting todos from localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};