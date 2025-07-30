# Crisalys Literary Symposium Platform

## Overview

This is a full-stack web application for the Crisalys Literary Symposium 2024, a literary event hosted by St. Joseph's College. The platform serves as a comprehensive registration and information system for various literary competitions including dramatics, debates, verbal correlations, and other creative events.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theming (navy and gold color scheme)
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Uploads**: Multer middleware for handling multipart/form-data
- **Session Management**: Built-in memory storage (development) with PostgreSQL session store support

## Key Components

### Data Models
- **Users**: Basic user authentication system
- **Registrations**: Event registration with support for individual and team participation
- **Contact Messages**: Contact form submissions
- **Events**: Literary competition information and rules

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Event branding with date, venue, and call-to-action
- **Events Section**: Filterable event cards with expandable rules
- **Schedule Section**: Two-day event timeline
- **Registration Section**: Multi-step form with file upload capability
- **Contact Section**: Contact form with venue information

### Backend Routes
- **POST /api/registrations**: Handle event registrations with file uploads
- **POST /api/contact**: Process contact form submissions
- **File Upload**: Support for college ID verification (JPEG, PNG, PDF)

## Data Flow

1. **User Registration Flow**:
   - User fills registration form with personal details
   - Selects individual or team participation mode
   - Chooses events from available competitions
   - Uploads college ID for verification
   - Form validation using Zod schemas
   - Data stored in PostgreSQL via Drizzle ORM

2. **Event Information Flow**:
   - Static event data with rules and schedules
   - Filterable event display by category
   - Smooth navigation between sections

3. **Contact Flow**:
   - Contact form submission
   - Server-side validation
   - Storage in database for administrative review

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **File System**: Local file storage for uploads (development)

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI primitives
- **Lucide React**: Icon library
- **Google Fonts**: Custom typography (Playfair Display)

### Development Tools
- **Vite**: Development server and build tool
- **TSX**: TypeScript execution for development
- **ESBuild**: Production bundling

## Deployment Strategy

### Development
- Vite development server for frontend
- TSX for backend development with hot reload
- In-memory storage for rapid development iteration

### Production
- **Frontend**: Static build deployed via Vite
- **Backend**: Node.js server with ESBuild bundling
- **Database**: Neon PostgreSQL with connection pooling
- **File Storage**: Server filesystem (can be extended to cloud storage)

### Build Process
1. Frontend assets built to `dist/public`
2. Backend TypeScript compiled and bundled to `dist/index.js`
3. Database migrations applied via Drizzle Kit
4. Static file serving integrated with Express

The architecture prioritizes developer experience with TypeScript throughout, modern React patterns, and a scalable database design that can handle event registrations efficiently.