import { Autocomplete, Dialog, DialogContent, TextField } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"
import React, { useCallback, useState, useEffect } from 'react'
import GetAll from '../utils/GetAll';

function AddFriendModal({ open, handleClose }) {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [autocompleteOptions, setAutocomopleteOptions] = useState([]);
    const closeModal = useCallback(
        () => {
            setError("");
            handleClose();
        }, [handleClose],
    )

    useEffect(() => {
        const fetchAllData = async () => {
            const allUsers = await GetAll.fetchAllUsers();

            setAutocomopleteOptions([...allUsers]);
        }

        fetchAllData();
    }, [])

    const handleUsernameChange = (event, newValue) => {
        setUsername(newValue);
    }

  return (
    <>
        <Dialog
            open={open}
            onClose={closeModal}
            fullWidth maxWidth="sm"
        >
            <DialogContent
                sx={{
                    backgroundColor: '#1f2937',
                }}
            >
                <div className='flex justify-between items-center'>
                <div className="w-full text-center">
                    <h1 className='text-white text-3xl'>Add a Friend</h1>
                </div>
                <CloseIcon onClick={ closeModal } className="cursor-pointer text-white" />
                </div>
                <div className="flex flex-col">
                <Autocomplete
                    freeSolo
                    options={autocompleteOptions}
                    getOptionLabel={(option) => option.displayName}
                    onChange={handleUsernameChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Add a Friend'
                            variant='outlined'
                        />
                    )}
                />
            <button className='text-white bg-purple-600' type="submit">
              Add Friend
            </button>
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default AddFriendModal