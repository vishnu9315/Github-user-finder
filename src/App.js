import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthWrapper>
    <Routes>
      {/* <PrivateRoute path = "/" exact element = { <Dashboard />} /> */}
      <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}/>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
    </AuthWrapper>
  );
}

export default App;
