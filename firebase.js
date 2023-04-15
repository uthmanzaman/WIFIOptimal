// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore  } from "firebase/firestore";


//import { getAnalytics } from "firebase/analytics";
          


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBghOptZDWwVYDfHW9lX7rjBtFsyQOvxew",
  authDomain: "wifi-optimal.firebaseapp.com",
  projectId: "wifi-optimal",
  storageBucket: "wifi-optimal.appspot.com",
  messagingSenderId: "253409081242",
  appId: "1:253409081242:web:1127d0991203524b6d2c23",
  measurementId: "G-4BGNH4VE0Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// init services 
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
  })





export {db,auth};