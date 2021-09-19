import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBACE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBACE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBACE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBACE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBACE_MESSANGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBACE_APP_ID
        apiKey: "AIzaSyDczlV0z9WtoS2aQL6sDkhHwUr7suw4yH4",
  authDomain: "mk-consultadd.firebaseapp.com",
  projectId: "mk-consultadd",
  storageBucket: "mk-consultadd.appspot.com",
  messagingSenderId: "1097925010370",
  appId: "1:1097925010370:web:bc51bc99156546484cac5b"
});

export const auth = app.auth();
export const db = app.firestore();
export default app;