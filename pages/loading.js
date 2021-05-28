import React from 'react';
import mainLogo from './logo.png'
import styled from 'styled-components'
import Head from 'next/head'
import {Circle} from 'better-react-spinkit'
// import { Container } from './styles';

export default function Loading() {
    return (
        <Container>
              <Head>
                <title>Login</title>
              </Head>
          <LoginContainer>
            <AppLogo src={mainLogo}/>
            <Circle size={50} />
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
  
  
  const LoginContainer = styled.div`
  
  display:flex;
  flex-direction: column;
  margin-top:100px;
  align-items: center;
  
  
  
  
  `
