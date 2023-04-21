import React, { useContext, useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import AddFriendModal from "./AddFriendModal";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

function SideBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data())
    });

    return () => {
      unsub();
    }
  }

    currentUser.uid && getChats();
  }, [currentUser.uid])

  const handleTabChange = (u) => {
    dispatch({ type:'CHANGE_USER', payload: u })
  }

  return (
    <>
      <div className="flex flex-col pb-2">
        <div className="flex bg-gray-900 h-20 items-center justify-between pl-10 pr-10">
          <Avatar
            src={currentUser.photoURL}
            alt={currentUser.displayName}
          />
          <h2 className="text-3xl">{currentUser.displayName}</h2>
          <Link to={"/settings"}>
            <button className="w-10 h-10 mt-2">
              <MoreHorizIcon
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
            </button>
          </Link>
        </div>
        <div className="flex justify-center mt-10">
          <h2 className="text-3xl mr-10 ml-14">Add Friend</h2>
          <button
            onClick={handleModalOpen}
            className="bg-gray-900 w-12 h-12 rounded-lg"
          >
            <PersonAddIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </button>
        </div>
        <hr className="m-6 border-gray-600" />
        {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="flex items-center border-2 border-b-4 border-gray-700 m-10 mb-0 mt-2 pt-2 pb-2 border-b-purple-600 cursor-pointer hover:bg-gray-600"
          onClick={() => handleTabChange(chat[1].userInfo)}
          key={chat[0]}
        >
          <Avatar
            src={chat[1].userInfo.photoURL}
            alt={chat[1].userInfo.displayName}
            className="ml-10"
          />
          <div className='w-10/12'>
          <p className="ml-2 text-xl">{chat[1].userInfo.displayName}</p>
          <p className='ml-2 break-words'>{chat[1].lastMessage ? chat[1].lastMessage.text.substring(0, 30)+'...' : ''}</p>
          </div>
        </div>
        ))}
      </div>
      <AddFriendModal open={modalOpen} handleClose={handleModalClose} />
    </>
  );
}

export default SideBar;
