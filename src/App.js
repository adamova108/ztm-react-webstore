import React from 'react';
import './App.css';

import './pages/homepage/homepage.styles.scss';

import { Routes, Route, Link } from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';


const HatsPage = () => (
   <div>
      <h1>HATS PAGE</h1>
   </div>
 );

function App() {
   return (
      <div>
         <Link to="/">Home</Link> |{" "}
         <Link to="/hats">Hats</Link>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="hats" element={<HatsPage />} />
         </Routes>
      </div>
   );
}

export default App;
