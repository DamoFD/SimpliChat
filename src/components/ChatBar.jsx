import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../firebase";
import { v4 as uuid } from 'uuid';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="w-full items-center flex">
      <input
        placeholder='type message here...'
        name='message'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className='m-5 w-2/3 rounded-md h-14 bg-gray-600 text-2xl pl-3 text-white focus:shadow-purple focus:outline-none focus:ring focus:ring-purple-600'
    />
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setImg(e.target.files[0])}
          className='hidden'
        />
        <label
          htmlFor='fileInput'
          className='h-16 w-16 mr-6 bg-purple-600 rounded-xl flex items-center justify-center cursor-pointer'>
        <AddPhotoAlternateIcon
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
        </label>
        <button
          onClick={handleSend}
          disabled={!text && !img}
          className='bg-purple-600 h-16 w-16 rounded-xl text-2xl cursor-pointer'
        >
          <SendIcon
            sx={{
              width: '30px',
              height: '30px',
            }}
          />
        </button>
      </div>
    </>
  );
}

export default ChatBar;
