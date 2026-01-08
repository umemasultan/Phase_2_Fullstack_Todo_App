# Hackathon Todo - Frontend

Next.js frontend for the Hackathon Todo application.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: React Context API + Server Actions

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and API client
│   └── types/          # TypeScript types/interfaces
├── public/             # Public static files
└── ...config files
```

## API Integration

The frontend communicates with the backend API using the API client in `src/lib/api-client.ts`. All API endpoints are prefixed with the `NEXT_PUBLIC_API_URL` environment variable.

## Development Guidelines

See `CLAUDE.md` for detailed development guidelines and best practices.

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
