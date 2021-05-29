import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import getRecipientEmail from '../getRecipientEmail';
import { useRouter } from 'next/router'
import moment from 'moment'


// import { Container } from './styles';

export default function Chat({id,users}) {
    //tim receiver
    const [user] = useAuthState(auth)
    const router = useRouter()
    // console.log(router.query.id);

    const joinChat = () =>{
            router.push('/chatFolder/'+id)
    }
    const [chatsSnapShot] = useCollection(db.collection('chats').doc(id).collection('messages').orderBy('createdAt','asc'));
    // console.log(chatsSnapShot?.docs[0].data().message);
    // console.log(chatsSnapShot?.docs?.length);
    // console.log(messagesSnapshot.docs[messagesSnapshot.docs.length-1].data());   
    

    // console.log(chatsSnapShot?.docs[chatsSnapShot?.docs?.length -1 ]?.data());
    let recipientEmail = getRecipientEmail(user,users)

    const [recipient] = useCollection(db.collection('users').where('email','==',recipientEmail[0]))
    // console.log(users)
  return (
    <Container onClick={joinChat}>
        {recipient?.size===1 ? recipient?.docs?.map((doc) =>(
        <UserAvatar key={doc.id} src={doc?.data().photoURL}/>

        ) ): (
            <UserAvatar >{recipientEmail[0][0]}</UserAvatar>
        )}


        <MessageContainer>
        <RecipientEmail>{recipientEmail}</RecipientEmail>
        <LastMessage style={{ color: "grey" }}>{chatsSnapShot?.docs[chatsSnapShot.docs.length-1]?.data()?.message}</LastMessage>
        </MessageContainer>

        <Time>{(chatsSnapShot?.docs[chatsSnapShot.docs.length-1]?.data()?.createdAt) ? moment(new Date((chatsSnapShot?.docs[chatsSnapShot.docs.length-1]?.data()?.createdAt)*1000)).format('LT') : "......."}</Time>


    </Container>
  );
}

const Container = styled.div`
display:flex;
cursor:pointer;
flex:1;
justify-content:space-between;
text-align:center;
background-color:rgb(47	37	64		);
border-bottom:1px solid rgb(56	45	76	);
:hover{
    opacity:0.8;
}
`;
const RecipientEmail = styled.p`
word-wrap:break-word;
`

const UserAvatar = styled(Avatar)`
margin:10px;
cursor:pointer;
:hover{
    opacity:0.8;
}
`

const MessageContainer = styled.div`
 color:white;
 display:block;
 width:150px;
 
 
`;
const Time = styled.p`
color:white;
`

const LastMessage = styled.p`

overflow:hidden;
white-space:nowrap;
text-overflow: ellipsis;


`