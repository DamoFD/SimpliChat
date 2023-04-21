import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Avatar } from '@mui/material';

function ChatBoxHeader() {

    const { data } = useContext(ChatContext);
  return (
    <div className='w-full bg-gray-800 justify-self-start h-20'>
        {data.user ? (
        <div className='w-full flex items-center justify-center'>
        <Avatar
            src={data.user.photoURL}
            alt={data.user?.displayName}
        />
        <h2 className='text-4xl p-4 text-center'>{data.user?.displayName}</h2>
        </div>
        ): null}
    </div>
  )
}

export default ChatBoxHeader