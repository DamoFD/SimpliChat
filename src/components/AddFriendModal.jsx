import {
  Autocomplete,
  Avatar,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useState, useEffect, useContext } from "react";
import GetAll from "../utils/GetAll";
import { AuthContext } from "../context/AuthContext";
import { getDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function AddFriendModal({ open, handleClose }) {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [autocompleteOptions, setAutocomopleteOptions] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const closeModal = useCallback(() => {
    setError("");
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    const fetchAllData = async () => {
      const allUsers = await GetAll.fetchAllUsers();

      setAutocomopleteOptions([...allUsers]);
    };

    fetchAllData();
  }, []);

  const handleUsernameChange = (event, newValue) => {
    setUsername(newValue);
    setUser(newValue);
  };

  const handleSubmit = async () => {
    if (!user) return;

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [`${combinedId}.userInfo`]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL || '',
            },
            [`${combinedId}.date`]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", user.uid), {
            [`${combinedId}.userInfo`]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL || '',
            },
            [`${combinedId}.date`]: serverTimestamp(),
        })
      }
    } catch (err) {
        console.error(err);
    }
    closeModal();
  };

  return (
    <>
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogContent
          sx={{
            backgroundColor: "#1f2937",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="w-full text-center">
              <h1 className="text-white text-3xl">Add a Friend</h1>
            </div>
            <CloseIcon
              onClick={closeModal}
              className="cursor-pointer text-white"
            />
          </div>
          <div className="flex flex-col">
            <Autocomplete
              freeSolo
              options={autocompleteOptions}
              getOptionLabel={(option) => option.displayName}
              onChange={handleUsernameChange}
              renderOption={(props, option) => (
                <li {...props}>
                  <Avatar
                    src={option.photoURL}
                    alt={option.displayName}
                    sx={{ width: 24, height: 24, marginRight: 1 }}
                  />
                  {option.displayName}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add a Friend"
                  variant="outlined"
                />
              )}
            />
            <button onClick={handleSubmit} className="text-white bg-purple-600" type="submit">
              Add Friend
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddFriendModal;
