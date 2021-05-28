import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import '../styles/globals.css'
import Login from './login';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import Loading from './loading';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
    const [user,loading] = useAuthState(auth)

    if(user){
      setInterval(function(){
        db.collection('users').doc(user.uid).set({
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName,
          lastActive: firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true});  
      },1000)
    


    }
    if(loading){
      return <Loading/>
    }
    if(!user){
      return <Login/>
    }


  return <Component {...pageProps} />
}

export default MyApp
