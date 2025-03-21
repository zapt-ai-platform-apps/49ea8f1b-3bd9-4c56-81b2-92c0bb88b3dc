# TaskMaster AI

A modern Todo List application with Gemini AI Assistant integration.

## Features

- Create, edit, complete, and delete tasks
- Categorize tasks with customizable categories
- Set priority levels (low, medium, high)
- Add due dates to tasks
- Filter tasks by status, priority, and category
- AI assistant powered by Google's Gemini 2.0 to help with task management
- Beautiful animations with Framer Motion
- Fully responsive design with Tailwind CSS

## Technology Stack

- React
- Tailwind CSS
- Framer Motion for animations
- Google Generative AI (Gemini 2.0)
- Local storage for task persistence
- Sentry for error tracking

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with your API keys
4. Run the development server with `npm run dev`

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Your ZAPT app ID
- `VITE_PUBLIC_APP_ENV`: Environment (development/production)
- `VITE_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Umami analytics ID
- `VITE_PUBLIC_GEMINI_API_KEY`: Google Gemini API key for the AI assistant