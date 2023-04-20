import React, { useContext, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CircleIcon from "@mui/icons-material/Circle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import AddFriendModal from "./AddFriendModal";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function SideBar({ handleTabChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
            <ChatIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </button>
        </div>
        <hr className="m-6 border-gray-600" />
        <div
          className="flex items-center border-2 border-b-4 border-gray-700 m-10 mb-0 mt-2 pt-2 pb-2 border-b-purple-600 cursor-pointer hover:bg-gray-600"
          onClick={() => handleTabChange()}
        >
          <Avatar className="ml-10" />
          <p className="ml-2 text-xl">John Doe</p>
          <div className="flex-grow" />
          <CircleIcon
            className="justify-self-end mr-4"
            sx={{
              color: true ? "green" : "red",
              height: "20px",
              width: "20px",
            }}
          />
        </div>
      </div>
      <AddFriendModal open={modalOpen} handleClose={handleModalClose} />
    </>
  );
}

export default SideBar;
