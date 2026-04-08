import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes/routeConfig';

function App() {
  return (
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
  );
}

export default App;
