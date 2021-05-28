import React from 'react';
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar';
import Head from 'next/head'
// import { Container } from './styles';
import ChatScreen from '../../components/ChatScreen';
import {withRouter} from 'react-router-dom';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';



export default function Chat({chat,messages}) {

    chat = JSON.parse(chat)
    messages = JSON.parse(messages)
     
    const [user] = useAuthState(auth)
    
    const recipientEmail = getRecipientEmail(user,chat.users)[0]

  return (

    <Container>
          <Head>
                <title>Chat with {recipientEmail}</title>
          </Head>
        <Sidebar/>
       <ChatScreen messages={messages}  id={chat.id} recipient={recipientEmail} />

       
    </Container>
  );


}

export  async function getServerSideProps(context) {
  const ref = await db.collection('chats').doc(context.params.id).get()

  const docRef = await db.collection('chats').doc(context.params.id)

  const messages = await docRef.collection('messages').orderBy('createdAt','asc').get()
  
  const data =[]
  messages?.docs?.map((doc) => {
    
    data.push({'id': doc.id,'data':doc.data() } )

  })
  
  const message = {
    ...data
  }
  const chat = {
    id: ref.id,
    ...ref.data()
  }

  // console.log(message[0]);

  // console.log(chat.users);
  return {
    props: {
        chat:JSON.stringify(chat),
        messages:JSON.stringify(message)
    }, // will be passed to the page component as props
  }
}



const Container = styled.div`
display:flex;
`;
