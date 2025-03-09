# Sayless

Sayless is a conversational search engine for fashion and clothing discovery that includes both text and image search capabilities. Users can perform search queries in a chat-like interface, receive results, and then refine their search or look for something else.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Functionalities](#core-functionalities)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  - [Components](#components-srccomponents)
  - [Pages](#pages-srcpages)
  - [State Management](#state-management-srcstate)
  - [API Services](#api-services-srcservices)
  - [Types](#types-srctypes)
  - [Styles](#styles-srcstyles)
  - [Hooks](#hooks-srchooks)
  - [Utils](#utils-srcutils)
  - [Constants](#constants-srcconstants)
- [Code Guidelines](#code-guidelines)
  - [General Principles](#general-principles)
  - [TypeScript Usage](#typescript-usage)
  - [Component Structure](#component-structure)
  - [State Management Guidelines](#state-management)
  - [Styling](#styling)
  - [API Calls](#api-calls)
  - [Testing](#testing)
  - [Performance](#performance)
  - [Naming Conventions](#naming-conventions)
  - [File Organization](#file-organization)
- [State Management Approach](#state-management-approach)
- [TypeScript Usage Details](#typescript-usage)
- [Project Setup](#project-setup)
  - [Docker Configuration](#docker-configuration)
  - [Next.js Configuration](#nextjs-configuration)
  - [CI/CD Pipeline](#cicd-pipeline)
  - [Package Configuration](#package-configuration)
- [Development Workflow](#development-workflow)
  - [Local Development](#local-development)
  - [Testing Workflow](#testing)
- [Deployment Architecture](#deployment-architecture)
- [AWS Infrastructure Configuration](#aws-infrastructure-configuration)
  - [VPC and Network](#vpc-and-network)
  - [Security Groups](#security-groups)
  - [ECS Resources](#ecs-resources)
  - [Load Balancing](#load-balancing)
  - [ECR Repository](#ecr-repository)
  - [CloudWatch Logs](#cloudwatch-logs)
  - [IAM Roles](#iam-roles)
  - [Task Definition](#task-definition)
  - [Troubleshooting Deployment Issues](#troubleshooting-deployment-issues)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development)
  - [Production Build](#building-for-production)
  - [Deployment Process](#deployment-process)
- [Next Steps](#next-steps)
- [License](#license)

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
│   │   ├── layout/             # Layout components
│   │   ├── search/             # Search-related components
│   │   ├── chat/               # Chat-related components
│   │   ├── product/            # Product-related components
│   │   ├── trending/           # Trending items components
│   │   ├── moodboard/          # Mood board components
│   │   └── brands/             # Brand-related components
│   ├── pages/                  # Next.js pages
│   ├── styles/                 # Global styles
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── services/               # API services
│   ├── state/                  # Signals and state management
│   │   ├── actions/            # State actions
│   ├── types/                  # TypeScript type definitions
│   ├── constants/              # Constants and configuration
│   └── context/                # React Context (if needed)
├── tests/                      # Test files
├── [Configuration files]       # Various configuration files
```

### Detailed Structure Explanation

#### Components (`src/components/`)

Components are organized by feature/domain and follow a consistent structure:

- **Common Components** (`src/components/common/`): Reusable UI elements used across the application
  - Button, Card, Input, Modal, etc.
  - Each component should be in its own directory with index.tsx, styles (if needed), and tests

- **Layout Components** (`src/components/layout/`): Components that define the application layout
  - Header, Footer, Layout wrapper, etc.
  - Responsible for consistent layout across pages

- **Feature Components**: Domain-specific components organized by feature
  - Search, Chat, Product, etc.
  - Each feature has its own directory with related components

Example component structure:
```
Button/
├── index.tsx         # Main component file
├── Button.test.tsx   # Component tests
└── types.ts          # Component-specific types (if needed)
```

#### Pages (`src/pages/`)

Next.js pages that define the routes of the application:

- `_app.tsx`: Custom App component for global state and layout
- `_document.tsx`: Custom Document component for HTML structure
- `index.tsx`: Home page
- `chat.tsx`: Chat interface page
- `search.tsx`: Search results page
- Feature-specific pages in their own directories

#### State Management (`src/state/`)

State management using Signals, organized by domain:

- **Domain-specific state files**:
  - `search.ts`: Search-related state (query, results, filters)
  - `chat.ts`: Chat-related state (messages, conversations)
  - `user.ts`: User-related state (preferences, authentication)
  - `location.ts`: Location-related state (current location, available countries)

- **Actions** (`src/state/actions/`):
  - Functions that modify state and interact with services
  - Organized by domain (searchActions.ts, chatActions.ts, etc.)
  - Handle side effects like API calls

Example state pattern:
```typescript
// State definition (state/search.ts)
export const searchQuery = signal<string>('');
export const searchResults = signal<Product[]>([]);

// Computed values
export const hasResults = computed(() => searchResults.value.length > 0);

// Actions (state/actions/searchActions.ts)
export async function performSearch() {
  // Implementation
}
```

#### API Services (`src/services/`)

Services for interacting with external APIs:

- `api.ts`: Base API service with common functionality
- Domain-specific services:
  - `searchService.ts`: Search API endpoints
  - `chatService.ts`: Chat API endpoints
  - `locationService.ts`: Location API endpoints

Services should:
- Handle API requests and responses
- Transform data between API and application formats
- Handle errors consistently

#### Types (`src/types/`)

TypeScript type definitions organized by domain:

- `index.ts`: Common types and re-exports
- Domain-specific type files:
  - `product.ts`: Product-related types
  - `chat.ts`: Chat-related types
  - `api.ts`: API-related types

Types should be:
- Comprehensive and well-documented
- Shared across components, state, and services
- Used consistently throughout the application

#### Styles (`src/styles/`)

Global styles and theme definitions:

- `globals.css`: Global CSS with Tailwind imports
- `theme.ts`: Theme variables (colors, typography, spacing)

#### Hooks (`src/hooks/`)

Custom React hooks for reusable logic:

- `useSearch.ts`: Hook for search functionality
- `useChat.ts`: Hook for chat functionality
- `useLocation.ts`: Hook for location detection

Hooks should:
- Encapsulate complex logic
- Be reusable across components
- Follow React's naming convention (use prefix)

#### Utils (`src/utils/`)

Utility functions for common operations:

- `formatting.ts`: Text/number formatting utilities
- `validation.ts`: Form validation utilities
- `analytics.ts`: Analytics utilities

#### Constants (`src/constants/`)

Application constants and configuration:

- `routes.ts`: Route definitions
- `api.ts`: API endpoints
- `config.ts`: Application configuration

## Code Guidelines

To maintain consistency and quality across the codebase, follow these guidelines:

### General Principles

1. **DRY (Don't Repeat Yourself)**: Avoid code duplication by creating reusable components and utilities.
2. **KISS (Keep It Simple, Stupid)**: Prefer simple, readable solutions over complex ones.
3. **Single Responsibility**: Each component, function, or module should have a single responsibility.
4. **Explicit over Implicit**: Be explicit about types, dependencies, and behavior.

### TypeScript Usage

1. **Type Everything**: Use TypeScript types for all variables, parameters, and return values.
2. **Avoid `any`**: Use specific types instead of `any` whenever possible.
3. **Use Interfaces for Objects**: Prefer interfaces for object types, especially for public APIs.
4. **Type Exports**: Export types that are used across multiple files.
5. **Use Type Inference**: Let TypeScript infer types when it's obvious, but be explicit when it's not.

```typescript
// Good
const user: User = { id: '1', name: 'John' };
function getUser(id: string): User { /* ... */ }

// Avoid
const user: any = { id: '1', name: 'John' };
function getUser(id): any { /* ... */ }
```

### Component Structure

1. **Functional Components**: Use functional components with hooks instead of class components.
2. **Props Interface**: Define a props interface for each component.
3. **Default Exports**: Use default exports for components.
4. **Component Organization**: Keep related files together in a component directory.

```typescript
// Component structure
import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
```

### State Management

1. **Signals for Global State**: Use signals for global state that needs to be shared across components.
2. **Local State with useState**: Use React's useState for component-local state.
3. **Computed Values**: Use computed signals for derived state.
4. **Actions for Side Effects**: Put side effects in action functions, not directly in components.

```typescript
// State management
import { signal, computed } from '@preact/signals-react';
import { Product } from '@/types';

// Define signals
export const products = signal<Product[]>([]);
export const filter = signal<string>('');

// Computed values
export const filteredProducts = computed(() => 
  products.value.filter(p => p.name.includes(filter.value))
);

// Actions
export function updateFilter(newFilter: string) {
  filter.value = newFilter;
}
```

### Styling

1. **Tailwind Classes**: Use Tailwind CSS classes for styling.
2. **Component Classes**: Create reusable component classes in globals.css.
3. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:, etc.).
4. **Theme Variables**: Use theme variables for consistent colors, spacing, etc.

```tsx
// Styling with Tailwind
<div className="flex flex-col md:flex-row items-center p-4 bg-primary text-white">
  <h1 className="text-2xl font-bold mb-2 md:mb-0 md:mr-4">Title</h1>
  <p className="text-sm">Description</p>
</div>
```

### API Calls

1. **Service Layer**: Use the service layer for all API calls.
2. **Error Handling**: Handle errors consistently across all API calls.
3. **Loading States**: Track loading states for all async operations.
4. **Data Transformation**: Transform API responses to match application data structures.

```typescript
// API call in an action
export async function fetchProducts() {
  try {
    isLoading.value = true;
    const response = await productService.getProducts();
    products.value = response.data;
  } catch (error) {
    errorMessage.value = error instanceof Error 
      ? error.message 
      : 'Failed to fetch products';
  } finally {
    isLoading.value = false;
  }
}
```

### Testing

1. **Unit Tests**: Write unit tests for utilities and hooks.
2. **Component Tests**: Test components in isolation.
3. **Integration Tests**: Test component interactions.
4. **E2E Tests**: Write end-to-end tests for critical user flows.

```typescript
// Component test
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Performance

1. **Memoization**: Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.
2. **Code Splitting**: Use dynamic imports for code splitting.
3. **Lazy Loading**: Lazy load components and images that are not immediately visible.
4. **Virtualization**: Use virtualization for long lists.

```typescript
// Memoization
import { memo, useCallback, useMemo } from 'react';

const ExpensiveComponent = memo(({ data, onItemClick }) => {
  // Component implementation
});

function ParentComponent() {
  const handleItemClick = useCallback((id) => {
    // Handle click
  }, []);

  const processedData = useMemo(() => {
    // Expensive data processing
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);

  return <ExpensiveComponent data={processedData} onItemClick={handleItemClick} />;
}
```

### Naming Conventions

1. **PascalCase for Components**: Use PascalCase for component names (e.g., `SearchBar`).
2. **camelCase for Variables/Functions**: Use camelCase for variables, functions, and methods.
3. **UPPER_CASE for Constants**: Use UPPER_CASE for constants.
4. **Descriptive Names**: Use descriptive names that convey purpose.

```typescript
// Naming conventions
const MAX_ITEMS = 10; // Constant

function calculateTotal(items) { /* ... */ } // Function

const UserProfile = () => { /* ... */ }; // Component

const [isLoading, setIsLoading] = useState(false); // State variable
```

### File Organization

1. **One Component per File**: Each component should be in its own file.
2. **Index Files for Exports**: Use index files to export multiple components from a directory.
3. **Consistent Imports**: Use consistent import ordering (React, external, internal).

```typescript
// Import ordering
import { useState, useEffect } from 'react'; // React imports first
import { useRouter } from 'next/router'; // External imports second
import { Button } from '@/components/common'; // Internal imports third
import { useSearch } from '@/hooks'; // More internal imports
import { searchProducts } from '@/state/actions'; // More internal imports
import { Product } from '@/types'; // Type imports
import styles from './styles.module.css'; // Style imports last
```

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

The CI/CD pipeline is implemented using GitHub Actions and consists of three main jobs:

#### Test Job
- Runs on every pull request and push to main
- Sets up Node.js environment
- Installs dependencies
- Runs linting and tests (with continue-on-error to prevent blocking deployment)

#### Build and Push Job
- Runs only on pushes to the `main branch`
- Configures AWS credentials
- Logs in to Amazon ECR
- Temporarily disables TypeScript validation to ensure builds succeed
- Builds the Docker image
- Tags and pushes the image to ECR

#### Deploy Job
- Downloads the current task definition from ECS
- Updates the task definition with the new image
- Deploys the updated task definition to ECS
- Waits for service stability
- Verifies the deployment by checking for running tasks

To set up the CI/CD pipeline:

1. **Add AWS credentials to GitHub repository secrets**:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   
   The IAM user associated with these credentials needs permissions for:
   - ECR (push/pull images)
   - ECS (describe/update services and task definitions)
   - CloudWatch Logs (for viewing logs)

2. **Ensure your repository contains**:
   - A valid `Dockerfile` for building the application
   - The task definition JSON file (`task-definition.json`)

3. **Customize the workflow as needed**:
   - Update environment variables in the workflow file
   - Add additional testing or deployment steps
   - Configure notifications for deployment status

#### Common CI/CD Issues and Solutions

1. **Missing yarn.lock file**:
   - **Issue**: The workflow fails with "Dependencies lock file is not found" error
   - **Solution**: The workflow is configured to handle this by creating an empty yarn.lock file and using npm commands instead
   - **Prevention**: Commit a valid yarn.lock file to your repository by running `yarn install` locally first

2. **TypeScript validation errors**:
   - **Issue**: The Docker build fails due to TypeScript errors
   - **Solution**: The workflow temporarily disables TypeScript validation during the build
   - **Best practice**: Fix TypeScript errors in your codebase rather than relying on this workaround

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

## AWS Infrastructure Configuration

The Sayless frontend application is deployed on AWS using a containerized approach with Amazon ECS (Elastic Container Service). This section documents the AWS infrastructure components, their configuration, and how they work together.

### VPC and Network

The application reuses an existing VPC where other Sayless components (like DocumentDB) are already running:

- **VPC ID**: vpc-00dd714a32b88e221
- **CIDR Block**: 172.31.0.0/16
- **Subnets**:
  - subnet-0083924300ec6557d (eu-west-1a, 172.31.16.0/20)
  - subnet-0fd8291bc36eeef5c (eu-west-1b, 172.31.32.0/20)
  - subnet-0de1d5c2a950e1f39 (eu-west-1c, 172.31.0.0/20)

**Why it's useful**: Reusing the existing VPC allows for communication between the frontend, backend, and database components while simplifying network configuration and reducing the number of networking components to manage.

**How to use it**: When deploying new resources, specify this VPC ID and its subnets to ensure all components can communicate with each other.

### Security Groups

Security groups control the inbound and outbound traffic for the application:

- **Frontend Security Group**: sg-0d613a5825b34cdce
  - Allows inbound HTTP (port 80)
  - Allows inbound HTTPS (port 443)
  - Allows inbound traffic on container port (3000)

**Why it's useful**: Security groups act as virtual firewalls to control traffic to and from your resources, providing an essential layer of security.

**How to use it**: When creating or updating ECS services or other resources, reference this security group ID to apply the same security rules.

```bash
# Create a security group
aws ec2 create-security-group --group-name sayless-frontend-sg \
  --description "Security group for Sayless frontend application" \
  --vpc-id vpc-00dd714a32b88e221

# Add inbound rules
aws ec2 authorize-security-group-ingress --group-id sg-0d613a5825b34cdce \
  --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-0d613a5825b34cdce \
  --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-0d613a5825b34cdce \
  --protocol tcp --port 3000 --cidr 0.0.0.0/0
```

### ECS Resources

The application runs in an Amazon ECS cluster:

- **Cluster Name**: sayless-application-cluster
- **Service Name**: sayless-frontend-service
- **Launch Type**: FARGATE (serverless)
- **Desired Count**: 1 (can be scaled up as needed)

**Why it's useful**: ECS provides a fully managed container orchestration service that allows you to run and scale containerized applications without managing the underlying infrastructure.

**How to use it**: Use the AWS CLI or console to deploy, update, and monitor the ECS service.

```bash
# Create an ECS service
aws ecs create-service --cluster sayless-application-cluster \
  --service-name sayless-frontend-service \
  --task-definition sayless-frontend:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-0083924300ec6557d,subnet-0fd8291bc36eeef5c,subnet-0de1d5c2a950e1f39],securityGroups=[sg-0d613a5825b34cdce],assignPublicIp=ENABLED}" \
  --scheduling-strategy REPLICA
```

### Load Balancing

The application uses an Application Load Balancer (ALB) to distribute traffic:

- **Load Balancer Name**: sayless-frontend-alb
- **DNS Name**: sayless-frontend-alb-1989423192.eu-west-1.elb.amazonaws.com
- **Listener**: HTTP on port 80
- **Target Group**: sayless-frontend-tg (forwards to container port 3000)

**Why it's useful**: The ALB automatically distributes incoming application traffic across multiple targets, provides SSL/TLS termination, and supports path-based routing.

**How to use it**: Access the application using the ALB's DNS name. For production, you would typically create a custom domain and point it to this ALB.

```bash
# Create a load balancer
aws elbv2 create-load-balancer --name sayless-frontend-alb \
  --subnets subnet-0083924300ec6557d subnet-0fd8291bc36eeef5c subnet-0de1d5c2a950e1f39 \
  --security-groups sg-0d613a5825b34cdce \
  --scheme internet-facing \
  --type application

# Create a target group
aws elbv2 create-target-group --name sayless-frontend-tg \
  --protocol HTTP --port 3000 \
  --vpc-id vpc-00dd714a32b88e221 \
  --target-type ip \
  --health-check-path / \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 5 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 2

# Create a listener
aws elbv2 create-listener --load-balancer-arn arn:aws:elasticloadbalancing:eu-west-1:273534795987:loadbalancer/app/sayless-frontend-alb/7e0ce474578d2504 \
  --protocol HTTP --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:eu-west-1:273534795987:targetgroup/sayless-frontend-tg/dad76b62daeb7420
```

### ECR Repository

The application's Docker images are stored in Amazon ECR:

- **Repository Name**: sayless-frontend
- **Repository URI**: 273534795987.dkr.ecr.eu-west-1.amazonaws.com/sayless-frontend

**Why it's useful**: ECR is a fully managed Docker container registry that makes it easy to store, manage, and deploy Docker container images.

**How to use it**: Push Docker images to this repository and reference them in your ECS task definitions.

```bash
# Login to ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 273534795987.dkr.ecr.eu-west-1.amazonaws.com

# Build and push an image
docker build -t sayless-frontend:latest .
docker tag sayless-frontend:latest 273534795987.dkr.ecr.eu-west-1.amazonaws.com/sayless-frontend:latest
docker push 273534795987.dkr.ecr.eu-west-1.amazonaws.com/sayless-frontend:latest
```

### CloudWatch Logs

The application logs are sent to CloudWatch Logs:

- **Log Group**: /ecs/sayless-frontend

**Why it's useful**: CloudWatch Logs allows you to centralize logs from all your systems, applications, and AWS services for easy monitoring, analysis, and troubleshooting.

**How to use it**: View and analyze logs through the AWS Console or CLI.

```bash
# View log streams
aws logs describe-log-streams --log-group-name /ecs/sayless-frontend

# Get log events
aws logs get-log-events --log-group-name /ecs/sayless-frontend --log-stream-name YOUR_LOG_STREAM
```

### IAM Roles

The application uses IAM roles for secure access to AWS services:

- **Task Execution Role**: ecsTaskExecutionRole
  - Allows ECS to pull images from ECR
  - Allows ECS to send logs to CloudWatch

**Why it's useful**: IAM roles provide secure, temporary credentials for your ECS tasks to access other AWS services without hardcoding credentials.

**How to use it**: Reference this role in your task definitions.

### Task Definition

The task definition specifies how the container should run:

- **Task Definition Name**: sayless-frontend
- **CPU**: 256 (.25 vCPU)
- **Memory**: 512 MB
- **Network Mode**: awsvpc
- **Container Port**: 3000
- **Environment Variables**:
  - NODE_ENV: production
  - NEXT_PUBLIC_API_URL: https://api.yourdomain.com

**Why it's useful**: The task definition is a blueprint for your application, defining which container image to use, resource requirements, port mappings, and environment variables.

**How to use it**: Create or update the task definition using the AWS CLI or console.

```bash
# Register a task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

Example `task-definition.json`:
```json
{
    "family": "sayless-frontend",
    "networkMode": "awsvpc",
    "executionRoleArn": "arn:aws:iam::273534795987:role/ecsTaskExecutionRole",
    "containerDefinitions": [
        {
            "name": "sayless-frontend",
            "image": "273534795987.dkr.ecr.eu-west-1.amazonaws.com/sayless-frontend:latest",
            "essential": true,
            "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 3000,
                    "protocol": "tcp"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/sayless-frontend",
                    "awslogs-region": "eu-west-1",
                    "awslogs-stream-prefix": "ecs"
                }
            },
            "environment": [
                {
                    "name": "NODE_ENV",
                    "value": "production"
                },
                {
                    "name": "NEXT_PUBLIC_API_URL",
                    "value": "https://api.yourdomain.com"
                }
            ]
        }
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "256",
    "memory": "512"
}
```

### Troubleshooting Deployment Issues

When deploying the application to AWS, you might encounter some common issues. Here are solutions to problems we've experienced:

#### 503 Service Temporarily Unavailable

If you see a 503 error when accessing your application through the load balancer, follow these troubleshooting steps:

1. **Check if ECS tasks are running**:
   ```bash
   aws ecs list-tasks --cluster sayless-application-cluster --service-name sayless-frontend-service
   ```
   If no tasks are running, check the service events to understand why:
   ```bash
   aws ecs describe-services --cluster sayless-application-cluster --services sayless-frontend-service | grep -A 10 "events"
   ```

2. **Check stopped tasks for failure reasons**:
   ```bash
   aws ecs list-tasks --cluster sayless-application-cluster --desired-status STOPPED
   aws ecs describe-tasks --cluster sayless-application-cluster --tasks TASK_ARN | grep -A 10 "stoppedReason"
   ```

3. **Common issues and solutions**:
   - **Missing Docker image**: Ensure your image exists in ECR
     ```bash
     aws ecr list-images --repository-name sayless-frontend
     ```
     If empty, build and push your image as described in the Deployment Process section.
   
   - **TypeScript build errors**: If Docker build fails due to TypeScript errors, you can temporarily disable validation:
     - In `tsconfig.json`: Set `"strict": false` and `"noImplicitAny": false`
     - In `next.config.js`: Add `typescript: { ignoreBuildErrors: true }`
     
   - **Health check failures**: Check target health in the target group
     ```bash
     aws elbv2 describe-target-health --target-group-arn TARGET_GROUP_ARN
     ```
     Ensure your application is properly responding on the health check path (default: /).

4. **Verify deployment success**:
   ```bash
   curl -I http://your-load-balancer-dns-name/
   ```
   A successful response will show HTTP/1.1 200 OK.

Remember to properly fix TypeScript errors after deployment is stable rather than keeping validation disabled.

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

### Deployment Process

To deploy the application to AWS:

1. **Build and push the Docker image**:
   ```bash
   # Login to ECR
   aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 273534795987.dkr.ecr.eu-west-1.amazonaws.com

   # Build and tag the image
   docker build -t sayless-frontend:latest .
   docker tag sayless-frontend:latest 273534795987.dkr.ecr.eu-west-1.amazonaws.com/sayless-frontend:latest
   
   # Push the image to ECR
   docker push 273534795987.dkr.ecr.eu-west-1.amazonaws.com/sayless-frontend:latest
   ```

2. **Update the ECS service**:
   ```bash
   # Force a new deployment
   aws ecs update-service --cluster sayless-application-cluster --service sayless-frontend-service --force-new-deployment
   ```

3. **Monitor the deployment**:
   ```bash
   # Check deployment status
   aws ecs describe-services --cluster sayless-application-cluster --services sayless-frontend-service
   ```

4. **Access the application**:
   - Use the ALB DNS name: sayless-frontend-alb-1989423192.eu-west-1.elb.amazonaws.com
   - For production, configure a custom domain with Route 53

#### Using the Automated Deployment Script

For convenience, a deployment script is provided that automates the entire process:

```bash
# Make the script executable (first time only)
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

The script will:
- Build and push the Docker image to ECR
- Update the ECS service
- Wait for the deployment to complete
- Verify that tasks are running
- Display the load balancer URL

#### Automated CI/CD with GitHub Actions

For automated deployments, the project uses GitHub Actions. When code is pushed to the main branch, the CI/CD pipeline will:
1. Run tests
2. Build and push the Docker image
3. Deploy to ECS

See the [CI/CD Pipeline](#ci-cd-pipeline) section for more details.

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

6. **AWS Infrastructure Enhancements**
   - Set up HTTPS with AWS Certificate Manager
   - Configure auto-scaling for the ECS service
   - Implement CloudFront for content delivery
   - Set up Route 53 for custom domain routing
   - Enhance monitoring with CloudWatch alarms

## License
[Specify your license here]

