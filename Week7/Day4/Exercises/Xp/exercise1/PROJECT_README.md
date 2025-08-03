# React ErrorBoundary Project

This project demonstrates the implementation of React ErrorBoundary with React Router and Bootstrap.

## Features

- **ErrorBoundary Class Component**: Catches JavaScript errors in child components
- **React Router**: Navigation between different screens
- **Bootstrap**: Responsive UI components
- **Three Routes**: Home, Profile, and Shop (Shop intentionally throws an error)

## Components

### ErrorBoundary
- Class component with `hasError` state
- Uses `componentDidCatch()` to handle errors
- Provides fallback UI when errors occur

### Screen Components
- **HomeScreen**: Displays welcome message
- **ProfileScreen**: Shows profile information
- **ShopScreen**: Intentionally throws an error to test ErrorBoundary

## Testing the ErrorBoundary

1. Navigate to the Shop page
2. The ShopScreen component will throw an error
3. ErrorBoundary will catch the error and display a fallback UI
4. Click "Try Again" to reset the error state

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner

## Dependencies

- react-router-dom: For client-side routing
- bootstrap: For responsive UI components

## Project Structure

```
src/
├── App.js          # Main app component with routing
├── ErrorBoundary.js # Error boundary class component
├── App.css         # Custom styles
└── index.js        # Entry point
```
