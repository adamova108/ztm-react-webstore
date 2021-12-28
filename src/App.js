import React from 'react';
import './App.css';

import './pages/homepage/homepage.styles.scss';

import { Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

const HatsPage = (props) => {
   console.log(props);
   let { hatid } = useParams();
   let location = useLocation();
   return (
      <div>
         <h1>HATS PAGE {hatid}</h1>
         <Link to={`${location.pathname}/elemke`}>Elemke</Link>
      </div>
   );
}

const HatsSubPage = () => {
   let { hatid } = useParams();
   return (
      <div>
         <h1>HATS-SUB PAGE {hatid}</h1>
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

class App extends React.Component {

   constructor() {
      super();

      this.state = {
         currentUser: null
      }

   }


   componentDidMount() {
      auth.onAuthStateChanged(user => {
         this.setState({ currentUser: user })
        // console.log(user)
      })
   }


   render() {
      /*let navigate = useNavigate();
      let location = useLocation();*/
      //console.log(location);
      return (
         <div>
            <Header />
            {
               this.state.currentUser != null ? <p>Welcome, {this.state.currentUser.displayName}!</p> : ''
            }
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/shop" element={<ShopPage />} />
               <Route path="/sign-in" element={<SignInAndSignUpPage />} />

               <Route path="hats" element={<HatsPage kuki="muki" />} />
               <Route path="hats/*" element={<HatsPage />} />
               <Route path="hats/:hatid" element={<HatsSubPage />} />
               <Route path="prods/:pid" element={<ProdID />} />
            </Routes>
            <Link to="/">Home</Link> |{" "}
            <Link to="/shop">Shop</Link> |{" "}
            <Link to="/hats">Hats</Link> |{" "}
            <Link to="/prods/jóska">Prod</Link> |{" "}
            {/* <button onClick={() => {navigate("/prods/pista")}}>Pista</button> */}
         </div>
      );
   }
}

export default App;
