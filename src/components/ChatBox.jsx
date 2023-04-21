import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBar from "./ChatBar";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import Message from './Message';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unsub()
    }
  }, [data.chatId])

    const bottomDiv = useRef(null);

    useEffect(() => {
        bottomDiv.current?.scrollIntoView({ behavior: "smooth"});
    })

  return (
    <div className="flex flex-col justify-end h-full">
      <div className='w-full bg-gray-700 justify-self-start'>
        <h2>{data.user?.displayName}</h2>
      </div>
        <div className="flex flex-col w-full overflow-y-auto flex-grow">
            {messages.map(m=>(
              <Message message={m} key={m.id} />
            ))}
            <div ref={bottomDiv}/>
        </div>
        <ChatBar />
    </div>
  )
}

export default ChatBox