import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import getRecipientEmail from '../getRecipientEmail';
import { useRouter } from 'next/router'
import moment from 'moment'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';


// import { Container } from './styles';
const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);


  const StyledBadgeOffline = withStyles((theme) => ({
    badge: {
      backgroundColor: 'grey',
      color: 'grey',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);
  
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
export default function Chat({id,users}) {
    //tim receiver
    const [user] = useAuthState(auth)
    const router = useRouter()
    // console.log(router.query.id);
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const joinChat = () =>{
            router.push('/chatFolder/'+id)
    }
    const [chatsSnapShot] = useCollection(db.collection('chats').doc(id).collection('messages').orderBy('createdAt','asc'));
    // console.log(chatsSnapShot?.docs[0].data().message);
    
    // console.log(chatsSnapShot?.docs?.length);
    // console.log(messagesSnapshot.docs[messagesSnapshot.docs.length-1].data()); 
    // if(chatsSnapShot){  
    // db.collection('chats').doc(id).set({
    //     timestamp:       chatsSnapShot?.docs[chatsSnapShot?.docs?.length-1]?.data()?.createdAt
    
    //   },{merge:true})
    // }

    // console.log(chatsSnapShot?.docs[chatsSnapShot?.docs?.length -1 ]?.data());
    let recipientEmail = getRecipientEmail(user,users)

    const [recipient] = useCollection(db.collection('users').where('email','==',recipientEmail[0]))
    const currentUser = db.collection('users').where('email','==',user.email)
    const [currentUserSnapshot] = useCollection(currentUser)
    let myRecipient = recipient?.docs[0]
    // currentUserSnapshot?.docs?.map((currentUser)=>{
    //     // console.log(currentUser?.data()?.lastSeen)
    //     if(currentUser?.data()?.lastActive != null){
    //     let myTime = timeAgo.format(new Date(currentUser?.data()?.lastSeen?.toDate().getTime()))
    //     // console.log(myTime)
    //     if(myTime == 'just now'){
      
      
    //     }
    //     else{
    //     }
    //     }
      
    //   })

    //   {recipient?.size===1 ? recipient?.docs?.map((doc) =>(

            
    //     <UserAvatar key={doc.id} src={doc?.data().photoURL}/>

    //     ) ): (
    //         <UserAvatar >{recipientEmail[0][0]}</UserAvatar>
    //     )}

    
    // console.log(users)

    
//     <div className={classes.root}>
//       <StyledBadge
//         overlap="circle"
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         variant="dot"
//       >
//           {recipient?.size===1 ? recipient?.docs?.map((doc) =>(

            
// <UserAvatar key={doc.id} src={doc?.data().photoURL}/>

// ) ): (
//     <UserAvatar >{recipientEmail[0][0]}</UserAvatar>
// )}


//       </StyledBadge>
      
//     </div>
const classes = useStyles();
recipient?.docs?.map((recipientName)=>{
    // console.log(currentUser?.data()?.lastSeen)
    if(recipientName?.data()?.lastActive != null){
    let recipientTime = timeAgo.format(new Date(recipientName?.data()?.lastActive?.toDate().getTime()))
    
          db.collection('users').doc(recipientName.id).set({
                isActive:recipientTime
          },{merge:true})
  
    
    }
        
  
  })
    function showReceiver(){
      if(myRecipient?.data()?.isActive == "just now" || myRecipient?.data()?.isActive == 'in a moment'){
        return (
          <div className={classes.root}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            variant="dot"
          >
          </StyledBadge>
          
        </div>

        )
      }
      else{
        return (
          <div className={classes.root}>
          <StyledBadgeOffline
            overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            variant="dot"
          >
          </StyledBadgeOffline>
          
        </div>
        )
      }
    }
  
   
  return (
    <Container onClick={joinChat}>
    {/* {recipient?.docs?.map((recipient)=>{
        {recipient?.data()?.lastActive != null ? (
            (timeAgo.format(new Date(recipient?.data()?.lastActive?.toDate().getTime())) == 'just now' ?? (
                a
            ))
        ):(
            a
        )}
    })} */}
    <UserContainer>
        {showReceiver()}
        {recipient?.size===1 ? recipient?.docs?.map((doc) =>(

            
<UserAvatar key={doc.id} src={doc?.data().photoURL}/>

) ): (
    <UserAvatar >{recipientEmail[0][0]}</UserAvatar>
)}
</UserContainer>



        <MessageContainer>
        <RecipientEmail>{recipientEmail}</RecipientEmail>
        <LastMessage style={{ color: "grey" }}>{chatsSnapShot?.docs[chatsSnapShot.docs.length-1]?.data()?.message}</LastMessage>
        </MessageContainer>

        <Time>{(chatsSnapShot?.docs[chatsSnapShot.docs.length-1]?.data()?.createdAt) ? moment(new Date((chatsSnapShot?.docs[chatsSnapShot.docs.length-1]?.data()?.createdAt)*1000)).format('LT') : "......."}</Time>


    </Container>
  );
}
const UserContainer = styled.div`
display:flex;
justify-content: space-between;
justify-items: center;
`

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