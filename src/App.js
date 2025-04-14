import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/sections/Home';
import Menu from './components/sections/Menu';
import AboutUs from './components/sections/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/menu" element={
          <Layout>
            <Menu />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
