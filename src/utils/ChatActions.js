import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ChatActions = {
updateUserChatsPhotoURL: async (uid, newPhotoURL) => {
    try {
        const userChatsRef = doc(db, "userChats", uid);
        const userChatsDoc = await getDoc(userChatsRef);
    
        if (userChatsDoc.exists()) {
          const userChatsData = userChatsDoc.data();
    
          // Iterate over all chat documents
          for (const chatId in userChatsData) {
            if (userChatsData.hasOwnProperty(chatId)) {
              const chatInfo = userChatsData[chatId];
              const friendUid = chatInfo.userInfo.uid;
    
              // Update current user's photoURL in friend's userChats
              const friendChatsRef = doc(db, "userChats", friendUid);
              const friendChatsDoc = await getDoc(friendChatsRef);
    
              if (friendChatsDoc.exists()) {
                const friendChatsData = friendChatsDoc.data();
                for (const friendChatId in friendChatsData) {
                  if (
                    friendChatsData.hasOwnProperty(friendChatId) &&
                    friendChatsData[friendChatId].userInfo.uid === uid
                  ) {
                    await updateDoc(friendChatsRef, {
                      [`${friendChatId}.userInfo.photoURL`]: newPhotoURL,
                    });
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error updating userChats photoURL:", error);
      }
    },

}

export default ChatActions;
  