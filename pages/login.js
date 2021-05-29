import  styled  from 'styled-components';
import React from 'react';
import { Button } from '@material-ui/core';
import mainLogo from './logo.png'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,db,provider} from '../firebase'
import Head from 'next/head'
// import { Container } from './styles';

export default function Login() {
  // const [user] = useAuthState(auth)
  // console.log(user);
  const SignIn = () =>{
    auth.signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage);
    });

  }

  return (
      <Container>
            <Head>
              <title>Login</title>
            </Head>
        <LoginContainer>
          <AppLogo src={mainLogo}/>
          <LoginBtn onClick={SignIn}>Sign In With Google</LoginBtn>
        </LoginContainer>
      </Container>
  );
}
const Container = styled.div`
display:grid;
place-items:center;

`;

const AppLogo = styled.img`
width:350px;
height:350px;
`;

const LoginBtn = styled(Button)`
  width:100%;
`;
const LoginContainer = styled.div`

display:flex;
flex-direction: column;
align-items: center;
margin-top: 10px;


border-radius:5px;
box-shadow: 0px 4px 14px -3px rgba( 0 , 0 , 0 , 0.7)
`