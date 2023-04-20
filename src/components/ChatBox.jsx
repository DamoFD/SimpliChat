import React, { useEffect, useRef } from 'react';
import ChatBar from "./ChatBar";

function ChatBox() {
    const bottomDiv = useRef(null);

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    })

  return (
    <div className="flex flex-col justify-end h-full">
        <div className="flex flex-col-reverse w-full overflow-y-auto flex-grow">
            <div ref={bottomDiv}/>
        </div>
        <ChatBar />
    </div>
  )
}

export default ChatBox