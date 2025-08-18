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
import Leaderboard from '../components/Leaderboard';
import JoinChallenge from '../pages/JoinChallenge';
import AllLeader from '../pages/AllLeader';
import CheckInModal from '../components/CheckInModal';
import Success from '../pages/Success';
import InvitesPage from '../components/InvitesPage';

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
          <Route path='/leaderboard/:challengeId' element={<Leaderboard/>}/>
          <Route path='/globalchallenge' element={<JoinChallenge/>}/>
          <Route path='/globalLeaders' element={<AllLeader/>}/>
          <Route path='/checkin/:challengeId' element={<CheckInModal/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/invites' element={<InvitesPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;