import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';
import TimeAgo from "timeago-react"
import moment from 'moment'

// import { Container } from './styles';

export default function Message({image,id,message,sender,time}) {
    // messages?.map((doc)=>{
      const [user] = useAuthState(auth)
    //     console.log(doc.data());
    // })
    // console.log(message);
    // console.log(id);
    // console.log(sender);
    // var date = new Date(time);

  const viewImg = () =>{

  }
    
    
  return (
    <Container>
                {sender === user.email ? (
                  <MessageContainerRight>
                    {image ? (
                  <MessagesFloatRight style sender={sender}  key={id}>
                      <UploadImage onClick={viewImg} src={image} width={"150"} alt="" />

                  </MessagesFloatRight>

                    ):(
                      <MessagesFloatRight sender={sender}  key={id}>{message}</MessagesFloatRight>

                    )}
                  <TimeSendRight>{time ? moment(new Date(time*1000)).format('LTS') : "..."}</TimeSendRight>
                
                  </MessageContainerRight>

                ):(
                  
                  <MessageContainerLeft>
                    {image ? (
                  <MessagesFloatLeft sender={sender}  key={id}>
                      <UploadImage src={image} width={"150"} alt="" />


                  </MessagesFloatLeft>

                    ):(
                      <MessagesFloatLeft sender={sender}  key={id}>{message}</MessagesFloatLeft>

                    )}
                  {/* <MessagesFloatLeft  key={id}>{message}</MessagesFloatLeft> */}
                  
                  <TimeSendLeft>{time ? moment(new Date(time*1000)).format('LTS') : "..."}</TimeSendLeft>
                  </MessageContainerLeft>
                )}
        

    </Container>
  );
}

const TimeSendRight = styled.p`
position: absolute;
    font-size: .85em;
    font-weight: 300;
    bottom: -6px;
    color:white;

    right: 5px;
`
const TimeSendLeft = styled.p`
position: absolute;
    font-size: .85em;
    font-weight: 300;
    bottom: -10px;
    left: 5px;
    color:grey;
`
const Container = styled.div``
const MessageContainerLeft = styled.div`
position: relative;
    margin-left: 20px;
    margin-bottom: 10px;

    padding: 10px;
    background-color:rgb(54	48	80	);
    width: 200px;
    height: max-content;
    text-align: left;
    font: 400 .9em 'Open Sans', sans-serif;
    border: 1px solid rgb(54	48	80	);
    border-radius: 10px;
    word-wrap: break-word;
    color:whitesmoke;

    :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 15px solid rgb(54	48	80	);
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    top: 0;
    left: -15px;
}

:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 17px solid rgb(54	48	80	);
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: -1px;
    left: -17px;
}

`;

const MessageContainerRight = styled.div`

position: relative;
    margin-bottom: 10px;
    margin-left: calc(100% - 240px);
    padding: 10px;
    background-color: rgb(152	126	242		);
    width: 200px;
    height: max-content;
    font: 400 .9em 'Open Sans', sans-serif;
    border: 1px solid rgb(152	126	242		);;
    border-radius: 10px;
    word-wrap: break-word; 
    text-align: center;
    text-align:left;
    color:white;

    :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 15px solid rgb(152	126	242		);
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    bottom: 0;
    right: -15px;
}
:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 17px solid rgb(152	126	242		);
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    bottom: -1px;
    right: -17px;
}





`;
const MessagesFloatRight = styled.p`

`;
const MessagesFloatLeft = styled.p`
 
`


const UploadImage = styled.img`

    cursor:pointer;
    :hover{
      opacity:0.8;
    }

`