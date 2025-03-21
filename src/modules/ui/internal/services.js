/**
 * Internal UI module services
 */
export const internal = {
  /**
   * Gets a component by name
   * @param {string} name - Component name
   * @returns {Object} Component data
   */
  getComponentByName: (name) => {
    // In a real app, this might fetch from a registry
    return { name, type: 'component' };
  }
};