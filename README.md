# ReactJS Starter with Module-Based Architecture

A ReactJS starter template with a modular architecture for building scalable applications.

## Features

- Modular architecture with clear boundaries
- Event-driven communication between modules
- Path aliases for clean imports
- Sentry error tracking
- PWA support
- Tailwind CSS for styling

## Architecture

This application follows a contract-based modular architecture:

- **modules/** - Feature/domain modules with clear boundaries
  - **core/** - Core infrastructure (events, validation)
  - **ui/** - UI components and services
- **app/** - Application shell
  - **pages/** - Application pages/routes
- **shared/** - Cross-cutting utilities and components
- **styles/** - Global styles

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`