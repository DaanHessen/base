import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from './components/layout/Layout';
import Home from './components/sections/Home';
import Menu from './components/sections/Menu';
import AboutUs from './components/sections/AboutUs';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="page-transition"
        timeout={300}
      >
        <Routes location={location}>
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
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
