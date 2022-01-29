import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BottleFiller } from './features/bottle-filler/BottleFiller';
import Home from './features/home/Home';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="bottle" element={<BottleFiller />} />
      </Routes>
    </div>
  );
}

export default App;
