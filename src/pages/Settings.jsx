import React, { useContext, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import UserActions from '../utils/UserActions';
import { LinearProgress } from '@mui/material';
import defaultProfPic from '../assets/defaultProfPic.jpg';
import ChatActions from '../utils/ChatActions';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Settings() {
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const storageRef = ref(storage, `/images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {

          updateProfile(currentUser, { photoURL: url })

          UserActions.updateUser(currentUser.uid, { profilePic: url })
            .then(() => {
              console.log('Profile pic URL updated successfully');
            })
            .catch((error) => {
              console.log(error);
            });

            ChatActions.updateUserChatsPhotoURL(currentUser.uid, url)
              .then(() => {
                console.log("userChats photoURL updated successfully");
                navigate('/')
              })
              .catch((error) => {
                console.log(error);
              });
        });
      }
    )
  }

  return (
    <div className='pt-16 relative flex flex-col items-center'>
        <h1 className='text-white text-5xl'>Settings</h1>
        <Link to={'/'}><ArrowBackIcon
          className='text-white absolute top-16 left-2'
          fontSize='large'
        /></Link>
        <button
            className="bg-gray-900 w-20 h-12 rounded-lg text-white absolute top-16 right-2 text-lg"
            onClick={() => signOut(auth)}
        >
            Log Out
        </button>
        <img
          src={!currentUser.photoURL ? defaultProfPic : currentUser.photoURL}
          className='w-60 text-center mt-20 rounded-full h-60 object-cover'
        />
        <input type='file' onChange={handleChange} accept='/image/*' />
        <button onClick={handleUpload}>Upload Profile Pic</button>
        <LinearProgress
          variant="determinate"
          color='secondary'
          value={percent}
          style={{ height: '10px', width: '50%' }}
        />
    </div>
  )
}

export default Settings