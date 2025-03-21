import { useState, useCallback } from 'react';
import { initializeChat, sendMessage as geminiSendMessage } from '../services/gemini';
import * as Sentry from '@sentry/browser';

const useAssistant = (todos) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize the chat on first open
  const openAssistant = useCallback(() => {
    if (messages.length === 0) {
      const initialHistory = initializeChat();
      setMessages(initialHistory);
    }
    setIsOpen(true);
  }, [messages.length]);
  
  // Close the assistant
  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  // Send a message to the assistant
  const sendUserMessage = useCallback(async (text) => {
    if (!text.trim()) return;
    
    try {
      // Add the user message immediately
      setMessages(prev => [
        ...prev, 
        { role: "user", parts: [{ text }] }
      ]);
      
      setIsLoading(true);
      
      console.log("Sending message to assistant:", text);
      
      // Get response from Gemini
      const { message } = await geminiSendMessage(text, todos);
      
      console.log("Received response from assistant:", message);
      
      // Add AI response
      setMessages(prev => [
        ...prev, 
        { role: "model", parts: [{ text: message }] }
      ]);
    } catch (error) {
      console.error("Error in assistant:", error);
      Sentry.captureException(error);
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        { 
          role: "model", 
          parts: [{ 
            text: "Sorry, I encountered an error. Please try again." 
          }] 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [todos]);
  
  return {
    isOpen,
    openAssistant,
    closeAssistant,
    messages,
    sendMessage: sendUserMessage,
    isLoading
  };
};

export default useAssistant;