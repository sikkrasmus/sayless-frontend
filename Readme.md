# Sayless

Sayless is a conversational search engine for fashion and clothing discovery that includes both text and image search capabilities. Users can perform search queries in a chat-like interface, receive results, and then refine their search or look for something else.

## Project Overview

This project is the Sayless application frontend. It's being rebuilt from scratch with a focus on containerization, scalability, and modern frontend practices.

## Core Functionalities

1. **Search** - Natural language and image-based search for fashion items
   - Main page search component
   - In-chat search component
   - Different layouts for mobile and desktop

2. **Chat Interface** - Conversational UI for search refinement
   - Display conversation history
   - Show search results in chat
   - Simple filtering options

3. **Location Selection** - Header component for delivery location
   - Auto-detection via IP
   - Manual selection option

4. **Trending Items** - Display currently trending fashion items

5. **Mood Board** - Visual collections of fashion items

6. **Partner Brands** - Showcase of partner brand logos and information

7. **Header and Footer** - Navigation and site information

## Tech Stack

- **Frontend Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Signals (@preact/signals-react)
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Deployment**: AWS (ECS/EKS)

## State Management Approach

The application uses @preact/signals-react for state management, chosen for its:
- Minimal API with excellent performance
- Reduced boilerplate compared to other state management solutions
- Good support for reactive UI updates needed for chat and search interfaces
- Flexibility for both global and component-local state

Example usage pattern:
```typescript
// Create a global signal
import { signal } from '@preact/signals-react';
import { Product } from '../types';

export const searchResults = signal<Product[]>([]);
export const chatMessages = signal<ChatMessage[]>([]);

// Use in components
function SearchResults() {
  return (
    <div>
      {searchResults.value.map(result => (
        <ProductCard key={result.id} product={result} />
      ))}
    </div>
  );
}
```

## TypeScript Usage

TypeScript is used throughout the application to provide:
- Type safety for complex data structures
- Better developer experience with autocompletion
- Self-documenting code with interfaces and types
- Easier refactoring and maintenance as the project grows

Core types are defined for key data structures:
```typescript
// types/index.ts
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  // other product properties
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: number;
  // other message properties
}
```

## Project Setup

The project has been set up with the following components:

### Docker Configuration

1. **Production Dockerfile** (`Dockerfile`)
   - Multi-stage build process for optimized production images
   - Stage 1: Dependencies installation
   - Stage 2: Application build
   - Stage 3: Runtime with minimal footprint
   - Configured for Next.js standalone output mode

2. **Development Dockerfile** (`Dockerfile.dev`)
   - Configured for local development with hot reloading
   - Mounts local files for immediate code changes

3. **Docker Compose** (`docker-compose.yml`)
   - Local development environment with frontend and mock API services
   - Volume mapping for hot reloading
   - Environment variable configuration

4. **Docker Ignore** (`.dockerignore`)
   - Excludes unnecessary files from Docker builds
   - Improves build performance and reduces image size

### Next.js Configuration

1. **Next.js Config** (`next.config.js`)
   - Configured with standalone output mode for Docker optimization
   - Image domains configuration
   - Performance optimizations (SWC minify)
   - Kept as JavaScript file per Next.js best practices

2. **Tailwind CSS** (`tailwind.config.js`)
   - Custom theme configuration based on Sayless design system
   - Extended color palette, typography, and spacing
   - Content paths configuration
   - Kept as JavaScript file per Tailwind best practices

3. **PostCSS** (`postcss.config.js`)
   - Configured for Tailwind CSS and Autoprefixer
   - Kept as JavaScript file per PostCSS best practices

### CI/CD Pipeline

1. **GitHub Actions Workflow** (`.github/workflows/ci-cd.yml`)
   - Automated testing on pull requests
   - Docker image building and pushing to Amazon ECR
   - Deployment to Amazon ECS
   - Environment-specific configurations

### Package Configuration

1. **Package.json**
   - Next.js, React, and Tailwind CSS dependencies
   - TypeScript and type definitions
   - State management with @preact/signals-react
   - Development tools (ESLint, Jest, Cypress)
   - NPM scripts for development, building, testing, and linting

## Development Workflow

### Local Development

The project is set up for a smooth local development experience:

1. **Docker-based Development**
   ```bash
   # Start the development environment
   docker-compose up
   ```
   This starts the Next.js development server with hot reloading and a mock API service.

2. **Direct Development** (without Docker)
   ```bash
   # Install dependencies
   yarn install
   
   # Start development server
   yarn dev
   ```

### Testing

The project includes configuration for comprehensive testing:

1. **Unit and Component Tests**
   ```bash
   # Run tests
   yarn test
   
   # Run tests in watch mode
   yarn test:watch
   ```

2. **End-to-End Tests**
   ```bash
   # Open Cypress test runner
   yarn cypress
   
   # Run Cypress tests headlessly
   yarn cypress:headless
   ```

## Deployment Architecture

The application is designed for containerized deployment on AWS:

1. **Container Registry**
   - Amazon ECR for storing Docker images

2. **Container Orchestration**
   - Amazon ECS/EKS for running containers
   - Auto-scaling based on traffic patterns

3. **Load Balancing**
   - Application Load Balancer for traffic distribution
   - Path-based routing for frontend and API

4. **Content Delivery**
   - CloudFront for static assets and global distribution

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development without Docker)
- AWS CLI (for deployment)

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/sayless-frontend.git
cd sayless-frontend

# Start the development environment
docker-compose up
```

### Building for Production
```bash
# Build the production Docker image
docker build -t sayless-frontend:latest .
```

## Project Structure

The project follows a modular, feature-based structure for better organization and maintainability:

```
sayless-frontend/
├── .github/                    # GitHub Actions workflows
├── public/                     # Static assets
│   ├── fonts/                  # Custom fonts
│   ├── images/                 # Static images
│   └── favicon.ico             # Favicon
├── src/
│   ├── components/             # Shared React components
│   │   ├── common/             # Common UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   └── ...
│   │   ├── layout/             # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Layout/
│   │   │   └── ...
│   │   ├── search/             # Search-related components
│   │   │   ├── SearchBar/
│   │   │   ├── SearchResults/
│   │   │   ├── FilterOptions/
│   │   │   └── ...
│   │   ├── chat/               # Chat-related components
│   │   │   ├── ChatBubble/
│   │   │   ├── ChatInput/
│   │   │   ├── ChatHistory/
│   │   │   └── ...
│   │   ├── product/            # Product-related components
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGrid/
│   │   │   ├── ProductDetail/
│   │   │   └── ...
│   │   ├── trending/           # Trending items components
│   │   │   ├── TrendingSection/
│   │   │   ├── TrendingItem/
│   │   │   └── ...
│   │   ├── moodboard/          # Mood board components
│   │   │   ├── MoodBoard/
│   │   │   ├── MoodBoardItem/
│   │   │   └── ...
│   │   └── brands/             # Brand-related components
│   │       ├── BrandLogo/
│   │       ├── BrandGrid/
│   │       └── ...
│   ├── pages/                  # Next.js pages
│   │   ├── _app.tsx            # Custom App component
│   │   ├── _document.tsx       # Custom Document component
│   │   ├── index.tsx           # Home page
│   │   ├── chat.tsx            # Chat page
│   │   ├── search.tsx          # Search results page
│   │   ├── product/
│   │   │   ├── [id].tsx        # Product detail page
│   │   │   └── index.tsx       # All products page
│   │   └── api/                # API routes (if needed)
│   │       ├── location.ts     # Location detection API
│   │       └── ...
│   ├── styles/                 # Global styles
│   │   ├── globals.css         # Global CSS with Tailwind imports
│   │   └── theme.ts            # Theme variables
│   ├── hooks/                  # Custom React hooks
│   │   ├── useSearch.ts        # Hook for search functionality
│   │   ├── useChat.ts          # Hook for chat functionality
│   │   ├── useLocation.ts      # Hook for location detection
│   │   └── ...
│   ├── utils/                  # Utility functions
│   │   ├── formatting.ts       # Text/number formatting utilities
│   │   ├── validation.ts       # Form validation utilities
│   │   ├── analytics.ts        # Analytics utilities
│   │   └── ...
│   ├── services/               # API services
│   │   ├── api.ts              # Base API configuration
│   │   ├── searchService.ts    # Search API service
│   │   ├── chatService.ts      # Chat API service
│   │   ├── locationService.ts  # Location API service
│   │   └── ...
│   ├── state/                  # Signals and state management
│   │   ├── index.ts            # Exports all signals
│   │   ├── search.ts           # Search-related signals
│   │   ├── chat.ts             # Chat-related signals
│   │   ├── user.ts             # User-related signals
│   │   ├── location.ts         # Location-related signals
│   │   └── actions/            # State actions
│   │       ├── searchActions.ts # Search actions
│   │       ├── chatActions.ts   # Chat actions
│   │       └── ...
│   ├── types/                  # TypeScript type definitions
│   │   ├── index.ts            # Common types
│   │   ├── api.ts              # API response types
│   │   ├── product.ts          # Product-related types
│   │   ├── chat.ts             # Chat-related types
│   │   └── ...
│   ├── constants/              # Constants and configuration
│   │   ├── routes.ts           # Route definitions
│   │   ├── api.ts              # API endpoints
│   │   ├── config.ts           # App configuration
│   │   └── ...
│   └── context/                # React Context (if needed alongside signals)
│       ├── ThemeContext.tsx    # Theme context
│       └── ...
├── tests/                      # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── .dockerignore               # Docker ignore file
├── .gitignore                  # Git ignore file
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── jest.config.js              # Jest configuration
├── cypress.config.js           # Cypress configuration
├── Dockerfile                  # Production Docker configuration
├── Dockerfile.dev              # Development Docker configuration
├── docker-compose.yml          # Local development configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

### Key Structure Principles

1. **Component Organization**
   - Components are organized by feature/domain
   - Each component has its own directory with index.tsx, styles, and tests
   - Common UI components are separated from feature-specific components

2. **State Management**
   - Signals are organized by domain (search, chat, user, etc.)
   - Actions are separated from signal definitions for better organization
   - Each domain has its own file for better code splitting

3. **API Services**
   - Services are organized by domain
   - Base API configuration is centralized
   - Each service handles a specific part of the application

4. **Type Definitions**
   - Types are organized by domain
   - Common types are exported from index.ts
   - API response types are separated for better organization

5. **Hooks**
   - Custom hooks encapsulate complex logic
   - Hooks are named with the 'use' prefix following React conventions
   - Each hook focuses on a specific functionality

## Next Steps

1. **Project Structure Implementation**
   - Create the basic directory structure
   - Set up TypeScript configuration
   - Create initial state management with signals

2. **Core Component Development**
   - Implement the search component
   - Build the chat interface
   - Create the header with location selection

3. **API Integration**
   - Set up API service layer with TypeScript interfaces
   - Implement authentication if required
   - Connect to backend services

4. **Styling and Theming**
   - Implement the design system with Tailwind
   - Create responsive layouts for mobile and desktop

5. **Testing and Quality Assurance**
   - Write unit and component tests with TypeScript
   - Implement end-to-end tests for critical flows

## License
[Specify your license here]

