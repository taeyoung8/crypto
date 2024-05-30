import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Charts from './pages/Charts';
import Trend from './pages/Trend';
import Home from './pages/Home';
import Contact from './pages/Contact';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
          <main>
            <Routes>
              <Route path="/charts" element={<Charts />} />
              <Route path="/trend" element={<Trend />} />
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
      </div>
    </Router>
  );
};

export default App;
