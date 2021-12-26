import React from 'react';
import './App.css';

import './pages/homepage/homepage.styles.scss';

import { Routes, Route, Link, useParams } from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';


const HatsPage = () => (
   <div>
      <h1>HATS PAGE</h1>
   </div>
);

const ProdID = () => {
   const { pid } = useParams();
   return (
      <div>
         <h1>{pid.length < 2 ? "HEHE" : pid}</h1>
      </div>
   )
};

function App() {
   return (
      <div>
         <Link to="/">Home</Link> |{" "}
         <Link to="/hats">Hats</Link> |{" "}
         <Link to="/prods/jóska">Prod</Link>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="hats" element={<HatsPage />} />
            <Route path="prods/*" element={<ProdID />} />
            <Route path="prods/:pid" element={<ProdID />} />
         </Routes>
      </div>
   );
}

export default App;
