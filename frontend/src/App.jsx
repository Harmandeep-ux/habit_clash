import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Layout from './layout/Layout';
import HomePage from '../pages/HomePage';
import CreateChallenge from '../pages/CreateChallenge';
import InviteModal from '../components/InviteModal';
import ChallengeCard from '../components/ChallengeCard';

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
          <Route path='/createchallenge' element={<CreateChallenge/>}/>
          <Route path='/invite' element={<InviteModal/>}/>
          <Route path='/mine' element={<ChallengeCard/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;