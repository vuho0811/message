import { Avatar, Button, IconButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components'
import ChatIcon from '@material-ui/icons/Chat';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import Chat from './Chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import { useCollection } from 'react-firebase-hooks/firestore';
import Login from '../pages/login'
import firestore from 'firebase/firestore'
import ChatScreen from './ChatScreen';

// import { Container } from './styles';


export default function Sidebar() {
    const [user] = useAuthState(auth)

    let userChat = []
    if(user){
    const [chatsSnapShot] = useCollection(db.collection('chats').where('users','array-contains',user.email))
   chatsSnapShot?.docs?.map((doc) =>{
       userChat.push({
           id: doc.id,
           timestamp:doc.data().timestamp,
           users: doc.data().users
       })
   })
}


//    const [messagesSnapshot] = useCollection(db.collection('chats').where('users','array-contains',user.email).collection('messages'))

//    console.log(messagesSnapshot);
   userChat.sort((b, a) => (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0))

    const SignOut = () =>{
        auth.signOut().then(() =>{
            alert("Sign Out successfully")
        }).catch((error)=>{
            alert(error)
        })

    }
    const addReceiver = async () =>{
        let input = prompt("Enter Your Receiver!")
        const chatAlreadyExists = await db.collection('chats').where('users','==',[user.email,input]).get()
        const ChatAlreadyExists2 = await db.collection('chats').where('users','==',[input,user.email]).get()
       
        if(EmailValidator.validate(input) && input!= user.email && chatAlreadyExists.size == 0 && ChatAlreadyExists2.size == 0){
            db.collection('chats').add({
                users:[user.email,input],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        else{
            alert("Please Type A Valid Email")
        }
        
    }



  return (
      <Container>
        <Header>
            <LeftContainer>
            <IconButton>
                    <ChatIcon style={{ color: "white" }}/>
            </IconButton>
            <p>Simple Chat</p>
            </LeftContainer>
            {user && (
            <UserAvatar src={user.photoURL} onClick={SignOut}></UserAvatar>

            )}
        </Header>

        {/* <SearchBar>
                <SearchSharpIcon style={{ color: "white"}}/>
                <SearchInput ></SearchInput>

        </SearchBar> */}

        <SearchButton onClick={addReceiver} variant="outlined" style={{ backgroundColor:"rgb(34	28	46	)", color:"white" }}>Start A New Chat</SearchButton>
        {userChat.map((doc)=>(
                    <Chat id={doc.id} key={doc.id} users={doc.users} />

        ))}

      </Container>
  );
}

const Container = styled.div`
background-color:rgb(47	37	64	);
height:100vh;
overflow:scroll;
flex:0.35;
::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;

 
`;
const LeftContainer = styled.div`
display:flex;
padding-right:20px;
`;
const SearchBar = styled.div`
display:flex;
align-items:center;
background-color: rgb(47	37	64	);
height:50px;
padding-left:10px;
padding-right:20px;



`;
const SearchInput = styled.input`
flex:1;
border:none;
outline-width:0;
background-color: rgb(47	37	64	);
color:white;
padding-left:20px;



`;

const Header = styled.div`
display:flex;
flex:1;
justify-content: space-between;
top:0;

background-color: rgb(47	37	64	);
color:white;
`


const UserAvatar = styled(Avatar)`
cursor:pointer;
margin:5px;
:hover{
    opacity:0.8;
}
`;
const SearchButton = styled(Button)`
height:50px;

width:100%;

hover: {
    background-color:white;
}

`