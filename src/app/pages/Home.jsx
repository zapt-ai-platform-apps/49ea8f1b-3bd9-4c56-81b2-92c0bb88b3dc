import React from 'react';
import { Button } from '@/modules/ui/ui/components';

/**
 * Home page component
 */
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to the App</h1>
      <p className="mb-4 text-gray-600">This is a starter template using the module-based architecture.</p>
      <Button onClick={() => alert('Button clicked!')}>Click me</Button>
    </div>
  );
}