import { GoogleGenerativeAI } from '@google/generative-ai';
import * as Sentry from '@sentry/browser';

// Initialize the Gemini API
const initializeGemini = () => {
  const apiKey = import.meta.env.VITE_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Gemini API key is missing. Assistant functionality will not work.');
    return null;
  }
  
  try {
    return new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.error('Error initializing Gemini:', error);
    Sentry.captureException(error);
    return null;
  }
};

const genAI = initializeGemini();

// Configuration for the chat session
const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

// System prompt to guide Gemini on how to respond
const systemPrompt = `You are a helpful AI assistant for a todo list app named TaskMaster AI. 
Help users organize their tasks, provide suggestions for task management, 
and answer questions about productivity and time management.

Be friendly, supportive, and provide actionable advice. If users ask about their 
todo list, help them organize and prioritize tasks. If they want to break down 
complex tasks, suggest smaller steps they could add as separate tasks.

You can suggest categories for tasks, help with setting priorities, and recommend 
due dates based on urgency. You can also provide motivation and encouragement.

Remember, your goal is to help users be more productive and organized with their tasks.
`;

// Create and manage the chat history
let chatHistory = [];

export const initializeChat = () => {
  chatHistory = [{
    role: "model",
    parts: [{ text: "Hi there! I'm your TaskMaster AI assistant. How can I help you with your tasks today?" }]
  }];
  return chatHistory;
};

export const sendMessage = async (message, todos) => {
  if (!genAI) {
    return {
      message: "I'm not available right now because my API key is missing. Please provide a valid Gemini API key.",
      history: chatHistory
    };
  }

  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Add user message to history
    chatHistory.push({
      role: "user",
      parts: [{ 
        text: message + (todos.length > 0 
          ? `\n\nCurrent tasks in my todo list (for your reference):\n${todos.map(t => 
              `- ${t.text} (Priority: ${t.priority}${t.dueDate ? `, Due: ${t.dueDate}` : ''}${t.completed ? ', Completed' : ''})`
            ).join('\n')}`
          : '\n\nI don\'t have any tasks in my todo list yet.')
      }]
    });
    
    // Prepare the chat
    const chat = model.startChat({
      generationConfig,
      history: [{ role: "user", parts: [{ text: systemPrompt }] }, ...chatHistory],
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });
    
    console.log("Sending message to Gemini:", message);
    
    // Generate response
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    console.log("Received response from Gemini:", response);
    
    // Add AI response to history
    chatHistory.push({
      role: "model",
      parts: [{ text: response }]
    });
    
    return {
      message: response,
      history: chatHistory
    };
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    Sentry.captureException(error);
    
    return {
      message: "Sorry, I encountered an error processing your request. Please try again.",
      history: chatHistory
    };
  }
};