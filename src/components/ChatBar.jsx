import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../firebase";
import { v4 as uuid } from 'uuid';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";

function ChatBar() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [percent, setPercent] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if (img) {

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);

        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
            })
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })

    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })

    setText("")
    setImg(null)
  };

  return (
    <>
      <div className="w-full flex">
        <input
          placeholder="Type message here..."
          name="message"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button onClick={handleSend} disabled={!text && !img}>Submit</button>
      </div>
    </>
  );
}

export default ChatBar;
