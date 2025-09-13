# Valetax - Currency Converter

A responsive currency converter application built with React, TypeScript, and Vite. Features real-time exchange rates and offline support.

## 🚀 Setup Requirements

### Prerequisites

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Valetax
```

1. Install dependencies:

```bash
npm install
```

1. Create environment file:

```bash
cp .env.example .env
```

1. Configure your environment variables (see Environment Configuration section below)

## 🔧 Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Currency API Configuration
VITE_CURRENCY_API_URL=https://api.fxratesapi.com
```

### Environment Variables Explained

- `VITE_CURRENCY_API_URL`: Base URL for the currency exchange rate API. The application uses FXRates API for real-time exchange rates.

### .env.example

```env
# Currency API Configuration
# Get your API from https://fxratesapi.com
VITE_CURRENCY_API_URL=https://api.fxratesapi.com
```

## 🏃‍♂️ How to Run

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Other Available Scripts

```bash
# Type checking
npm run tsc:check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Run all checks
npm run check-all
```

## 🏗️ Architecture & Key Decisions

### Project Structure

```text
src/
├── components/          # Reusable UI components
├── features/           # Feature-based modules
│   └── currency-converter/
│       ├── api/        # API layer
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Custom hooks
│       ├── queries/    # React Query configurations
│       └── utils/      # Utility functions
├── hooks/              # Global custom hooks
├── lib/                # Third-party library configurations
├── pages/              # Page components
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

### Key Architectural Decisions

#### 1. API Choice - FXRates API

- **Selected**: FXRates API (<https://fxratesapi.com>)
- **Reasoning**:
  - Provides reliable, real-time exchange rates
  - Free tier available for development
  - RESTful API with JSON responses
  - Supports multiple base currencies
- **Base Currency**: EUR (European Euro) for consistent rate calculations
- **Fallback**: Graceful error handling for API failures

#### 2. Caching Strategy

- **Technology**: TanStack Query (React Query) with persistence
- **Implementation**:
  - **In-memory caching**: Automatic query result caching
  - **Persistent storage**: LocalStorage persistence for offline access
  - **Stale-while-revalidate**: Background refetching for fresh data
  - **Cache duration**: Configurable query invalidation
- **Benefits**:
  - Reduced API calls and improved performance
  - Offline functionality
  - Seamless user experience during network issues

#### 3. State Management

- **Server State**: TanStack Query for API data management
- **Local State**: React hooks for component-specific state
- **Persistence**: LocalStorage for user preferences and cache

#### 4. Formatting & Localization

- **Number Formatting**:
  - Decimal separator normalization (supports both '.' and ',')
  - Input validation for numeric values only
  - Precision handling (up to 6 decimal places for rates)
- **Currency Display**:
  - Native currency symbols
  - Currency code and full name display
  - Proper decimal digit handling per currency

#### 5. User Experience Decisions

- **Real-time Conversion**: Debounced input for smooth performance
- **Offline Support**: Cached rates available when offline
- **Responsive Design**: Mobile-first approach with CSS modules
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Handling**: User-friendly error messages and fallbacks

#### 6. Development Tooling

- **Build Tool**: Vite for fast development and optimized builds
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint + Prettier for consistent code style
- **SVG Handling**: SVGR for optimized SVG imports as React components

### Performance Optimizations

- Component memoization where appropriate
- Debounced API calls to prevent excessive requests

### Error Handling Strategy

- API error boundaries with user-friendly messages
- Network failure detection and offline indicators

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **Styling**: CSS Modules
- **API Client**: Native Fetch API
- **Development**: ESLint, Prettier, Husky

## 📱 Features

- Real-time currency conversion
- 170+ supported currencies
- Offline functionality with cached rates
- Responsive design for all devices
- Input validation and error handling
- Exchange rate history and timestamps
- Keyboard shortcuts and accessibility support
