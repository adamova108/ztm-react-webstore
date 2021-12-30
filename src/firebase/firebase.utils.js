// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//import { createContext, useContext, useEffect, useState } from "react";

/* import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCcZGXgRBCHWgT4Lm02_000AzB0IYiUHo0",
   authDomain: "crwn-db-30c20.firebaseapp.com",
   projectId: "crwn-db-30c20",
   storageBucket: "crwn-db-30c20.appspot.com",
   messagingSenderId: "152901467556",
   appId: "1:152901467556:web:dd8c66f4ff71faf780d531"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
/*const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const singInWithGoogle = () => signInWithPopup(auth, provider)
                                        .then((result) => {
                                            // This gives you a Google Access Token. You can use it to access the Google API.
                                            const credential = GoogleAuthProvider.credentialFromResult(result);
                                            const token = credential.accessToken;
                                            // The signed-in user info.
                                            const user = result.user;

                                        }).catch((error) => {
                                            // Handle Errors here.
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            // The email of the user's account used.
                                            const email = error.email;
                                            // The AuthCredential type that was used.
                                            const credential = GoogleAuthProvider.credentialFromError(error);
                                        }); */

export const singInWithGoogle = () => {
   const provider = new GoogleAuthProvider();
   provider.setCustomParameters({ prompt: 'select_account' });

   signInWithPopup(auth, provider)
      .then((re) => {
         //console.log(re);
      }).catch((err) => {
         console.log(err);
      })
}

/* firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase; */

/* const AuthContext = createContext({
    currentUser: null
})

export const useAuth = function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    const value = {
        currentUser
    }

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
} */

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) {
      return;
   }
   const userRef = doc(firestore, `users/${userAuth.uid}`);
   const userSnap = await getDoc(userRef);

   // If the database record doesn't exist then insert it
   if (!userSnap.exists()) {
      //console.log("No such document!", userSnap);
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userRef, {
            displayName,
            email,
            createdAt,
            ...additionalData
         });
      } catch (error) {
         console.log('Error creating user', error.message);
      }

      
   } else {
      //console.log("Document data:", userSnap.data());
      // doc.data() will be undefined in this case
   }
   
   return userRef;
   //console.log('firebase.utils.js', userRef);
   //return userRef;
}