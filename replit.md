# FirmOps - Compliance Workspace for CA Firms

## Overview
FirmOps is a structured workspace application for CA firms to manage compliance work efficiently. It helps manage clients, financial years, filings, and documents in a connected, logical manner.

## Project Architecture
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **State Management**: TanStack React Query

## Key Directories
- `src/` - Main source code
  - `src/components/` - React components
  - `src/pages/` - Page components
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Utility functions
- `public/` - Static assets

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` for production build
- Run `npm run lint` for linting
- Run `npm test` for running tests

## Deployment
Configured for static deployment with Vite build output in `dist/` directory.

## Recent Changes
- Migrated from Lovable to Replit environment
- Updated Vite config to use port 5000 with allowedHosts for Replit
- Removed lovable-tagger plugin (not needed in Replit)
