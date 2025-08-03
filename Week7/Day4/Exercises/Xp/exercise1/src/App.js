import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from './ErrorBoundary';
import './App.css';

// Functional Components
const HomeScreen = () => {
  return (
    <div className="container mt-4">
      <h1>Home Screen</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
};

const ProfileScreen = () => {
  return (
    <div className="container mt-4">
      <h1>Profile Screen</h1>
      <p>This is your profile page.</p>
    </div>
  );
};

const ShopScreen = () => {
  // This component intentionally throws an error
  throw new Error('ShopScreen component error - This is intentional for testing ErrorBoundary!');
  
  return (
    <div className="container mt-4">
      <h1>Shop Screen</h1>
      <p>This is the shop page.</p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Bootstrap Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              React App
            </NavLink>
            
            <div className="navbar-nav">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/"
              >
                Home
              </NavLink>
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/profile"
              >
                Profile
              </NavLink>
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/shop"
              >
                Shop
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Routes wrapped with ErrorBoundary */}
        <Routes>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
