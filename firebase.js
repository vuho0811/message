import firebase from 'firebase'
import 'firebase/storage';  // <----

const firebaseConfig = {
  apiKey: "AIzaSyByFp24EkX4t3NBAoX-zbhgJ4hGE5Q_FKs",
  authDomain: "messenger-cd1d4.firebaseapp.com",
  projectId: "messenger-cd1d4",
  storageBucket: "messenger-cd1d4.appspot.com",
  messagingSenderId: "840287891445",
  appId: "1:840287891445:web:0fd6621b682d5e971fbabc",
  measurementId: "G-F69GR6KE6P"
};

//   const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage()

  
  export {db, auth, provider,storage};