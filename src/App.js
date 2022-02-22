import React from 'react';
import './App.css';

import './pages/homepage/homepage.styles.scss';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import { Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from "react-router-dom";

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from "firebase/firestore";

import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

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

export function withRouter(Component) {
   function ComponentWithRouterProp(props) {
     let location = useLocation();
     let navigate = useNavigate();
     let params = useParams();
     return (
       <Component
         {...props}
         router={{ location, navigate, params }}
       />
     );
   }
 
   return ComponentWithRouterProp;
 }

class App extends React.Component {

   /* constructor() {
      super();

      this.state = {
         currentUser: null
      }

   } */


   unsubscribeFromAuth = null;

   
   componentDidMount() {
         
      const { setCurrentUser } = this.props;

      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
         console.log(userAuth);
         if (userAuth) {
            console.log('#1');
            const userRef = await createUserProfileDocument(userAuth);
            //this.setState({ currentUser: userAuth });
            //console.log(userRef);
            const unsub = onSnapshot(userRef, (snapshot) => {
               //console.log("Current data: ", snapshot.data());
               //this.setState({ 
               setCurrentUser({
                  id: snapshot.id,
                  ...snapshot.data()
               }/* , () => console.log('A', this.state) */);
            });
         
         } 
         console.log('#2'); // Since the createUserProfileDocument is an ASYNC/AWAIT function this runs first
         /* this.setState({ 
            currentUser: null // or userAuth
         }, () => console.log('B', this.state)) */ 

         setCurrentUser(userAuth); //or NULL ?

      });
   }


   componentWillUnmount() {
      this.unsubscribeFromAuth();
   }


   render() {
      /*let navigate = useNavigate();
      let location = useLocation();*/
      //console.log(location);
      return (
         <div>
            <Header />
            {
              // this.state.currentUser != null ? <p>Welcome, {this.state.currentUser.displayName}!</p> : ''
              this.props.currentUser ? <p>Welcome (App), {this.props.currentUser.displayName}!</p> : ''
            }
            {console.log('APP-PROPS', this.props)}
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/shop" element={<ShopPage />} />
               <Route 
                  path="/sign-in" 
                  /* element={<SignInAndSignUpPage />} */   
                  element={this.props.currentUser ? <Navigate to='/' /> : <SignInAndSignUpPage />} 
               />
               <Route path="/checkout" element={<CheckoutPage />} />

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

/* const mapStateToProps = ({ user }) => ({
   currentUser: user.currentUser
}) */

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
