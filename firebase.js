import firebase from 'firebase'
import 'firebase/storage';  // <----

const firebaseConfig = {
  apiKey: "AIzaSyDTFbxnz_2oIF-YaOSlctTb-7qFn1xQhBA",
  authDomain: "messenger-cbf76.firebaseapp.com",
  projectId: "messenger-cbf76",
  storageBucket: "messenger-cbf76.appspot.com",
  messagingSenderId: "354993891299",
  appId: "1:354993891299:web:bd8dd6bbc1859dc02ce2d6",
  measurementId: "G-61B3H40F2T"
};


//   const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage()

  
  export {db, auth, provider,storage};