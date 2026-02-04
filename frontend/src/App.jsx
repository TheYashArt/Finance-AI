import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Landing & Auth
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Feature Pages
import ChatPage from './pages/ChatPage';
import AvatarPage from './pages/AvatarPage';
import TrackerLayout from './pages/TrackerLayout';
import TrainModel from './pages/TrainModel';

// Tracker Sub-pages
import Dashboard from './routes/Dashboard';
import Transactions from './routes/Transactions';
import Goals from './routes/Goals';
import Recurring from './routes/Recurring';
import FinanceChat from './routes/FinanceChat';
import Categories from './routes/Categories';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Protected Routes */}
        <Route path="/menu" element={
          <ProtectedRoute>
            <MenuPage />
          </ProtectedRoute>
        } />

        {/* RAG Chatbot */}
        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } />
        <Route path="/train-model" element={
          <ProtectedRoute>
            <TrainModel />
          </ProtectedRoute>
        } />

        {/* AI Avatar */}
        <Route path="/avatar" element={
          <ProtectedRoute>
            <AvatarPage />
          </ProtectedRoute>
        } />

        {/* AI Finance Tracker */}
        <Route path="/tracker" element={
          <ProtectedRoute>
            <TrackerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="goals" element={<Goals />} />
          <Route path="recurring" element={<Recurring />} />
          <Route path="chat" element={<FinanceChat />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;