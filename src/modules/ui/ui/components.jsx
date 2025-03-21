import React from 'react';
import { eventBus } from '../../core/events';
import { events } from '../events';

/**
 * Simple button component
 */
export const Button = ({ children, onClick, ...props }) => {
  const handleClick = (e) => {
    try {
      onClick && onClick(e);
      // Publish component rendered event
      eventBus.publish(events.COMPONENT_RENDERED, { 
        component: 'Button',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      // Publish component error event
      eventBus.publish(events.COMPONENT_ERROR, { 
        component: 'Button',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <button
      className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};