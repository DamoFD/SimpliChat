import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBar from "./ChatBar";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import Message from './Message';
import ChatBoxHeader from './ChatBoxHeader';

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
    }, [messages]);

  return (
    <div className="flex flex-col justify-end h-full">
      <ChatBoxHeader />
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