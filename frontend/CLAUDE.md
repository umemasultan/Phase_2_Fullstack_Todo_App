# Frontend Workspace - Claude Code Rules

**Workspace:** frontend
**Type:** Web Application
**Parent:** hackathon-todo monorepo

## Overview

This workspace contains the frontend web application for the hackathon-todo project. All development in this workspace must follow the root-level Spec-Kit Plus conventions defined in `../CLAUDE.md`.

## Workspace-Specific Guidelines

### 1. Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: React Context API + Server Actions
- **HTTP Client**: Native fetch with Next.js
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

### 2. Project Structure
```
frontend/
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and API client
│   └── types/          # TypeScript types/interfaces
├── public/             # Public static files
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.js      # Next.js configuration
└── CLAUDE.md           # This file
```

### 3. Development Workflow

#### API Integration
- All API contracts are defined in `../specs/api/`
- Use the API client in `src/lib/api-client.ts` to interact with the backend
- Never hardcode API endpoints; use `NEXT_PUBLIC_API_URL` environment variable
- Handle loading, error, and success states for all API calls
- Use Server Actions for mutations when possible

#### Component Development
- Use functional components with TypeScript
- Keep components small and focused on a single responsibility
- Use composition over inheritance
- Document complex components with JSDoc comments
- Prefer Server Components over Client Components when possible
- Use 'use client' directive only when necessary (interactivity, hooks)

#### State Management
- Keep state as local as possible
- Lift state only when necessary for sharing between components
- Use global state management sparingly
- Document state shape and update patterns

#### Styling
- Follow the design system defined in `../specs/ui/`
- Use Tailwind CSS utility classes
- Use custom CSS only when necessary (in globals.css)
- Ensure responsive design for mobile, tablet, and desktop (mobile-first)
- Maintain accessibility standards (WCAG 2.1 AA minimum)

### 4. Testing Strategy

#### Unit Tests
- Test individual components in isolation
- Mock external dependencies (API calls, context, etc.)
- Aim for high coverage of business logic

#### Integration Tests
- Test component interactions and data flow
- Test form submissions and user workflows
- Verify API integration with mock servers

#### E2E Tests
- E2E tests are maintained at the root level
- Coordinate with backend team for full-stack testing

### 5. Code Quality

#### TypeScript
- Use strict mode (enabled in tsconfig.json)
- Define explicit types for props, state, and API responses
- Avoid `any` type; use `unknown` when type is truly unknown
- Use interfaces for object shapes, types for unions/primitives

#### Linting and Formatting
- Follow ESLint configuration
- Use Prettier for consistent formatting
- Run linters before committing

#### Performance
- Optimize bundle size with Next.js automatic code splitting
- Use dynamic imports for heavy components
- Minimize re-renders (React.memo, useMemo, useCallback)
- Use Next.js Image component for image optimization
- Monitor Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)

### 6. Security

- Sanitize user input to prevent XSS attacks
- Use HTTPS for all API calls
- Store sensitive data securely (never in localStorage for tokens)
- Implement CSRF protection for state-changing operations
- Follow OWASP security guidelines

### 7. Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy
- Use ARIA attributes when necessary

### 8. PHR Routing for Frontend

When creating Prompt History Records for frontend work:
- Frontend-specific features → `../history/prompts/frontend-<feature>/`
- Cross-workspace features → `../history/prompts/<feature-name>/`
- General frontend work → `../history/prompts/general/`

### 9. Specifications Reference

- **Feature Specs**: `../specs/features/` - Business requirements
- **API Contracts**: `../specs/api/` - Backend integration contracts
- **UI Specs**: `../specs/ui/` - Design system and UI guidelines
- **Database Schemas**: `../specs/database/` - Data models (for reference)

### 10. Common Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

## Reference

For general Spec-Kit Plus conventions, PHR creation, ADR suggestions, and architectural guidelines, see `../CLAUDE.md`.
