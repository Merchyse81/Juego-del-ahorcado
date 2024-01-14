// App.js
import './App.css';
import LogoGif from './assets/Logotipo.gif';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';


function App() {

  return (
    <div>
      <img src={LogoGif} alt="logo" className='logo' />
    <Router>
    <Routes>
      <Route path="/" exact element={<WelcomeScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/result" element={<ResultScreen />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;