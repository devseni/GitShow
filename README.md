# GitShow

![GitShow Demo](src/assets/git-show-demo.jpg)

A clean, modern GitHub user and repository explorer built with React, TypeScript, and Vite. Search for any GitHub user and instantly view their profile, stats, and recent repositories.

## Features

- **User Search**: Search any GitHub username to fetch their profile data
- **Profile Display**: Shows avatar, name, username, bio, location, and stats (repos, followers, following)
- **Repository List**: Displays up to 6 most recently updated public repositories with language indicators and star counts
- **Loading Skeletons**: Smooth skeleton loading states while fetching data
- **Error Handling**: User-friendly error messages with retry capability
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **GitHub REST API** - Data source (no authentication required for public data)

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx      # Search input with validation
│   ├── UserCard.tsx       # User profile display
│   ├── RepoList.tsx       # Repository grid container
│   ├── RepoItem.tsx       # Individual repository card
│   ├── LoadingState.tsx   # Skeleton loading UI
│   ├── ErrorMessage.tsx   # Error display with retry
│   └── __tests__/         # Component unit tests
├── hooks/
│   ├── useGithubUser.ts   # Custom hook for GitHub API calls
│   └── useGithubUser.test.ts
├── types/
│   └── github.ts          # TypeScript interfaces for GitHub API
├── utils/
│   ├── formatNumber.ts    # Number formatting (K, M notation)
│   └── formatNumber.test.ts
├── test/
│   ├── mocks.ts           # Test mock data
│   └── setup.ts           # Vitest setup
├── App.tsx                # Main application component
├── App.css                # Component styles
├── index.css              # Global styles & CSS variables
└── main.tsx               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd git-show

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run coverage

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## API Usage

The app uses the public GitHub REST API (no authentication required):

- `GET /users/:username` - Fetch user profile
- `GET /users/:username/repos?sort=updated&per_page=6` - Fetch recent repositories

**Rate Limits**: Unauthenticated requests are limited to 60 requests/hour per IP. For higher limits, you can add a GitHub Personal Access Token to the fetch requests in `useGithubUser.ts`.

## Key Components

### `useGithubUser` Hook

Custom hook managing all GitHub API interactions:

```typescript
const { user, repos, loading, error, searchUser, reset } = useGithubUser();
```

Returns:

- `user` - GitHub user data or null
- `repos` - Array of repository objects
- `loading` - Boolean loading state
- `error` - Error message string or null
- `searchUser(username)` - Function to search for a user
- `reset()` - Function to clear state

### `formatNumber` Utility

Formats numbers for display (e.g., 1500 → "1.5K", 2500000 → "2.5M").

## Testing

The project includes comprehensive unit tests using Vitest and React Testing Library:

- **Component tests**: SearchBar, UserCard, RepoList, RepoItem
- **Hook tests**: useGithubUser (success, error, loading states)
- **Utility tests**: formatNumber

Run tests:

```bash
npm run test          # Watch mode
npm run coverage      # With coverage report
```

## Styling

The project uses CSS custom properties (variables) for theming:

- **Typography**: Rubik font family
- **Animations**: Subtle fade/slide transitions

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly error/loading states
- Color contrast compliance
