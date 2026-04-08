import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes/routeConfig';
import ErrorBoundary from './components/errors/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={<route.component />} 
          />
        ))}
        {/* Redirect unknown routes to home */}
        <Route path="/" element={<Navigate to="/role-selection" replace />} />
        <Route path="*" element={<Navigate to="/role-selection" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
