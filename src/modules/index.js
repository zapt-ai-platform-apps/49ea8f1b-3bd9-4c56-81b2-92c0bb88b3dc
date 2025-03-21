import { api as uiApi } from './ui/api';
import { eventBus } from './core/events';

// Export public APIs for all modules
export const ui = uiApi;
export { eventBus };

/**
 * Initialize all modules
 */
export async function initializeModules() {
  // In a real app, this would run initialization for each module
  console.log('Initializing modules...');
  return Promise.resolve();
}