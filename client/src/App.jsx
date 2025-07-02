import { useEffect } from 'react'
import './App.css'
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NOTFOUND';
import Dashboard from './pages/Dashboard';
import {  Routes, Route } from "react-router-dom";


function App() {
  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.error('Backend error:', err)); // Add this
  }, []);


  return (
    <>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
