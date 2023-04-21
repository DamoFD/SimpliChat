import React, { useContext } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { formatDistanceToNow } from "date-fns";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const timeAgo = formatDistanceToNow(message.date.toDate(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const isCurrentUser = message.senderId === currentUser.uid;

  return (
    <div className={isCurrentUser
            ? "flex m-2 ml-10"
            : "flex flex-row-reverse m-2 mr-10"
    }
    >
      <Avatar
        src={
          isCurrentUser
            ? currentUser.photoURL
            : data.user.photoURL
        }
      />
      <div>
        {message.text && (
          <p
            className={isCurrentUser
                ? 'p-2 bg-purple-800 ml-10 rounded-2xl text-2xl break-words max-w-2xl text-center'
                : 'p-2 bg-gray-300 mr-10 rounded-2xl text-2xl break-words max-w-2xl text-black text-center'
            }
          >
            {message.text}
          </p>
        )}
        {message.img && (
          <img src={message.img} alt="" className="max-w-xl max-h-xl mt-10 ml-10 rounded-2xl object-cover" />
        )}
        <p className={isCurrentUser ? 'ml-10 text-gray-400 text-sm' : 'mr10 text-gray-400 text-sm'}>{timeAgo}</p>
      </div>
    </div>
  );
}

export default Message;
