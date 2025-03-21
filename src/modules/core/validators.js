import * as Sentry from '@sentry/browser';

/**
 * Creates a validator function for the given schema
 * @param {any} schema - Schema to validate against
 * @param {string} contextName - Name of what's being validated (e.g., 'User', 'Order')
 * @returns {function} - Validator function
 */
export const createValidator = (schema, contextName) => {
  return (data, options = {}) => {
    const {
      actionName = 'unknown',
      location = 'unknown',
      direction = 'unknown',
      moduleFrom = 'unknown',
      moduleTo = 'unknown'
    } = options;
    
    try {
      // Validate data against schema
      // In a real app, this would use something like Zod
      // For now, we're just checking the data is not null
      if (data === null || data === undefined) {
        throw new Error('Data is null or undefined');
      }
      return data;
    } catch (error) {
      // Create validation context
      const validationContext = {
        type: contextName,
        action: actionName,
        location,
        direction,
        flow: `${moduleFrom} → ${moduleTo}`,
        timestamp: new Date().toISOString()
      };
      
      // Format error message
      const errorMessage = `Validation failed in ${validationContext.action} (${validationContext.flow})`;
      
      // Log to console
      console.error(errorMessage, error);
      
      // Send to Sentry
      Sentry.captureException(error, {
        extra: validationContext
      });
      
      throw new Error(errorMessage);
    }
  };
};