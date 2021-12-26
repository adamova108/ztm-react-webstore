import React from 'react';
import './App.css';

import './pages/homepage/homepage.styles.scss';

import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';


const HatsPage = (props) => {
   console.log(props);
   return (
      <div>
         <h1>HATS PAGE</h1>
      </div>
   );
}

const ProdID = () => {

   let { pid } = useParams();

   return (
      <div>
         <h1>{pid.length < 2 ? "HEHE" : pid}</h1>
      </div>
   )
};

function App() {
   let navigate = useNavigate();
   return (
      <div>
         <Link to="/">Home</Link> |{" "}
         <Link to="/hats">Hats</Link> |{" "}
         <Link to="/prods/jóska">Prod</Link> |{" "}
         <button onClick={() => {navigate("/prods/pista")}}>Pista</button>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="hats" element={<HatsPage kuki="muki" />} />
            <Route path="prods/*" element={<ProdID />} />
            <Route path="prods/:pid" element={<ProdID />} />
         </Routes>
      </div>
   );
}

export default App;
