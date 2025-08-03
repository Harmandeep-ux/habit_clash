import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Added useAuth import
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Layout from './layout/Layout';
import HomePage from '../pages/HomePage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Login />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route 
            path='/home' 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path='/dashboard' element={<Layout />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;