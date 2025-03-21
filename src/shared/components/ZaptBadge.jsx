import React from 'react';

/**
 * "Made on ZAPT" badge component
 */
export default function ZaptBadge() {
  return (
    <a 
      href="https://www.zapt.ai" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 text-xs py-1 px-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-colors"
    >
      Made on ZAPT
    </a>
  );
}