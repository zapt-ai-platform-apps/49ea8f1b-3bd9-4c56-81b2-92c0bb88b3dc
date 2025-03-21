import { internal } from './internal/services';
import { validateComponent } from './validators';

/**
 * UI module's public API
 */
export const api = {
  /**
   * Gets a component by name
   * @param {string} name - Component name
   * @returns {Object} Component data
   */
  getComponent: (name) => {
    const component = internal.getComponentByName(name);
    return validateComponent(component, {
      actionName: 'getComponent',
      location: 'ui/api.js',
      direction: 'outgoing',
      moduleFrom: 'ui',
      moduleTo: 'client'
    });
  }
};