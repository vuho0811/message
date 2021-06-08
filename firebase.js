import firebase from 'firebase'
import 'firebase/storage';  // <----

const firebaseConfig = {
  apiKey: "AIzaSyAoAX8bjTtS27YlHEh-miFpgL51UjKJLew",
  authDomain: "myapp-7b5f9.firebaseapp.com",
  projectId: "myapp-7b5f9",
  storageBucket: "myapp-7b5f9.appspot.com",
  messagingSenderId: "529318295078",
  appId: "1:529318295078:web:7929e9b3593e926c7fd8e7",
  measurementId: "G-8QCMZ1TJX6"
};

//   const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage()

  
  export {db, auth, provider,storage};