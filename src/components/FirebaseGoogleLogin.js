import { initializeApp } from "firebase/app";
// import firebase from 'firebase'
import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider, GithubAuthProvider, initializeAuth, signInWithPopup, browserSessionPersistence, browserPopupRedirectResolver} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCRfwNWlh-kA-VVeFAZpKGwwEXfjcrOh_c",

  authDomain: "raviproject-66df7.firebaseapp.com",

  projectId: "raviproject-66df7",

  storageBucket: "raviproject-66df7.appspot.com",

  messagingSenderId: "301135992728",

  appId: "1:301135992728:web:f5a456b6b1adaba2f57ded",

  measurementId: "G-MZFLFYM9EB"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

// export const auth = initializeAuth(app, {
//     persistence: browserSessionPersistence,
//     popupRedirectResolver: browserPopupRedirectResolver,
//  });

// const googleProvider = () => new GoogleAuthProvider()
// const gitProvider = () => new GithubAuthProvider()

// export const getUserDetailsFromGoogle = () => {
//     signInWithPopup(auth, googleProvider).then((data) => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     })
// }
// export const getUserDetailsFromGit = () => signInWithPopup(auth, gitProvider)



