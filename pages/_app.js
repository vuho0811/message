import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import '../styles/globals.css'
import Login from './login';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import Loading from './loading';
import Sidebar from '../components/Sidebar';
import { useCollection } from 'react-firebase-hooks/firestore';


function MyApp({ Component, pageProps }) {
    const [user,loading] = useAuthState(auth)
    if(user){

      localStorage.setItem('userActive', user.uid)

      setInterval(function(){

        db.collection('users').doc(user.uid).set({
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName,
          lastActive: firebase.firestore.FieldValue.serverTimestamp(),
          isActive:true
        },{merge:true});  
      },1000)

        
      
        
        

    }
    if(loading){
      return <Loading/>
    }
    if(!user){
      let myUser = localStorage.getItem('userActive')
      if(myUser != null){
        db.collection('users').doc(myUser).set({
          isActive:false
        },{merge:true})
      console.log(myUser)

      }
      return <Login/>
    }


  return <Component {...pageProps} />
}

export default MyApp
