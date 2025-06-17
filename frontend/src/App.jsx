import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css'; // Main App styles

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container"> {/* Added a container for consistent padding */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add more routes here as you build them */}
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
