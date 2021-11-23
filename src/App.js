import { Routes, Route } from 'react-router-dom';
import Locations from './pages/Locations';
import Pictures from './pages/Pictures';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route exact path = "/locations" element={<Locations/>}/>
        <Route path ="/locations/:location" element={<Pictures/>}/>
      </Routes>
    </>
  );
}

export default App;
