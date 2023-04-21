import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Message({message}) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

  return (
    <div className='flex'>
        <Avatar
            src={
                message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
        />
        <p>{message.text}</p>
        {message.img && <img
            src={message.img}
            alt=''
        />}
    </div>
  )
}

export default Message