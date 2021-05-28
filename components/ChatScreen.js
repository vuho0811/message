import { Avatar,IconButton } from '@material-ui/core';
import React, { useRef } from 'react';
import { useState } from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import moment from 'moment'
import ImageUploading, { ImageListType } from "react-images-uploading";
import ImageIcon from '@material-ui/icons/Image';


import styled from 'styled-components'
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Message from './Message'
import TimeAgo from "timeago-react"

// import { Container } from './styles';
export default function ChatScreen({id,recipient,messages}) {
    
    const lastMessage = useRef(null);
    const filePicker = useRef(null);
    const [imageToMessage,setImageToMessage] = useState(null)

    

    const scrollToBottom = () => {
        lastMessage.current.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
       
      };
     const [user] = useAuthState(auth)
    //  console.log(user);
     const [recipientSnapshot] = useCollection(db.collection('users').where('email','==', recipient))
    //  console.log(object);
     const [input, setInput] = useState(''); // '' is the initial state value
    //  console.log(messages);
    // let time = recipientSnapshot?.data()?.lastActive?.toDate()
    // console.log(time);
    const [chatsSnapShot] = useCollection(db.collection('chats').doc(id).collection('messages').orderBy('createdAt','asc'));
    // console.log(chatsSnapShot?.docs[0].data());
    const addImageToMessages = (e) =>{
        const reader = new FileReader();
        console.log(e.target.files[0]);
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) =>{
            setImageToMessage(readerEvent.target.result)
            // console.log(readerEvent.target.result);
        }
        
    }

    
    const ShowMessages = () =>{
        if(chatsSnapShot){
        return chatsSnapShot?.docs?.map((doc)=>(
            <Message time={doc.data().createdAt} image={doc.data().postImage}  sender={doc.data().sender} key={doc.id} id={doc.id} message={doc.data().message}/>
        ))
        }
        else{
            return Object.values(messages)?.map((doc)=>(
                <Message time={doc.data.createdAt} sender={doc.data.sender} key={doc.id} message={doc.data.message} id={doc.id}/>
            ))
        }
        

    }
    const removeImage = () =>{
        setImageToMessage('')
    }

     const sendMessages =  (e) =>{
         e.preventDefault();
        //  console.log(input);
        if(input !== ''){
        let result =  db.collection('chats').doc(id)
    
        result.collection('messages').add({
            message: input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            sender: user.email,


        })
                
                
            

            
            // result.collection('messages').doc(doc.id).set({
            //     ngu: '1'
            // },{merge:true})
        

        let myUser = db.collection('users').doc(user.uid)

        myUser.update({
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
        })

        scrollToBottom()
        setInput('')
    }
        else{
            let result =  db.collection('chats').doc(id)
    
        result.collection('messages').add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            sender: user.email,


        }).then((doc) =>{
            if(imageToMessage){
                const uploadTask = storage.ref(`messages/${doc.id}`).putString(imageToMessage,'data_url');
                removeImage();
                console.log(doc.id);
                
                uploadTask.on('state_change', null, (error) => console.log(error),() =>{
                    storage.ref('messages').child(doc.id).getDownloadURL().then(url =>{
                        result.collection('messages').doc(doc.id).set({
                            postImage : url
                        },{merge:true})
                    })
                }
                )
            }

            
            // result.collection('messages').doc(doc.id).set({
            //     ngu: '1'
            // },{merge:true})
        })

        let myUser = db.collection('users').doc(user.uid)

        myUser.update({
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
        })

        scrollToBottom()
        setInput('')
        }

        // else{
        //     let result =  db.collection('chats').doc(id)
    
        // result.collection('messages').add({
            
        //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //     sender: user.email,


        // }).then((doc) =>{
        //     if(imageToMessage){
        //         const uploadTask = storage.ref(`messages/${doc.id}`).putString(imageToMessage,'data_url');
        //         removeImage();
        //         console.log(doc.id);
                
        //         uploadTask.on('state_change', null, (error) => console.log(error),() =>{
        //             storage.ref('messages').child(doc.id).getDownloadURL().then(url =>{
        //                 result.collection('messages').doc(doc.id).set({
        //                     postImage : url
        //                 },{merge:true})
        //             })
        //         }
        //         )
        //     }

            
        //     // result.collection('messages').doc(doc.id).set({
        //     //     ngu: '1'
        //     // },{merge:true})
        // })

        // let myUser = db.collection('users').doc(user.uid)

        // myUser.update({
        //     lastActive: firebase.firestore.FieldValue.serverTimestamp()
        // })

        // scrollToBottom()
        // setInput('')
    
        // }

        
     }
  return (
    <Container>
            <Header>
                <UserContainer>
                {recipientSnapshot ? (
                    <UserAvatar src={recipientSnapshot?.docs[0]?.data().photoURL}/>
                ): (
                    <UserAvatar>{recipient[0]}</UserAvatar>
                )}
                
                <div>
                <RecipientName>{recipient} </RecipientName> 
                
                <LastActive>  Last Active : {""}  
                    {recipientSnapshot?.size >0 ? (
                       <TimeAgo   datetime={recipientSnapshot?.docs[0]?.data()?.lastActive?.toDate()}  />

                    ):(
                        <span>  Unavailable</span>
                    )}

                </LastActive>
                </div>

                </UserContainer>
                <VideocamSharpIcon style={{ color: "white" , marginRight:"20px" }}/>
            </Header>

            <MessageContainer>
                {ShowMessages()}
                <LastMessage ref={lastMessage}/>
            </MessageContainer>


            <SendMessage>
                <IconButton>
                <div onClick={() => filePicker.current.click()}>
                <ImageIcon style={{ color: "white" }}/>
                <input ref={filePicker} onChange={addImageToMessages} type="file" hidden/>

                </div>
             
           
          
                </IconButton>
                <MessageInput value={input} onChange={e => setInput(e.target.value)}></MessageInput>

                <SubmitBtn onClick={sendMessages} hidden>Send</SubmitBtn>

                {imageToMessage && (
                    <div >
                        <InputImg src={imageToMessage} alt=""   width="100" />
                    </div>
                )}
            </SendMessage>
    </Container>
  );
}
const LastMessage =styled.div`
margin-bottom:100px;

`;
const InputImg = styled.img`
    margin-right: 400px;
`
const Container = styled.div`
background-color: rgb(38	34	54			);
flex:0.8;
padding-left:40px;



`; 

const LastActive = styled.p`
color:white;
`
const SubmitBtn = styled.button`
`
const SendMessage = styled.form`
position: fixed;
bottom: 10px;
display:flex;
align-items:center;
width:100%;
background-color:rgb(47	42	68	);
border-radius:4em;

`;

const MessageInput =styled.input`
flex:0.6;
border:none;
outline-width:0;
padding-left:20px;
height:50px;    
/* border:none; */
background-color:rgb(47	42	68	);
color:white;
font-size:20px;

`;

const RecipientName = styled.p`
font-size:18px;
color:white;
`
const UserContainer = styled.div`
display:flex;

`

const Header = styled.div`
display:flex;
padding-bottom:10px;
position:sticky;
justify-content:space-between;
align-items:center;
border-bottom:1px solid rgb(56	45	76	);
`

const UserAvatar = styled(Avatar)`
margin-right:30px;
margin-top:15px;

`;

const MessageContainer =styled.div`

height:80vh;
overflow:scroll;
`