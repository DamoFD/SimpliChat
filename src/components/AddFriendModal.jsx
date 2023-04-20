import { Dialog, DialogContent } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"
import TextField from './TextField'
import React, { useCallback } from 'react'

function AddFriendModal({ open, handleClose }) {
    const closeModal = useCallback(
        () => {
            setError("");
            handleClose();
        }, [handleClose],
    )

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
                <form className="flex flex-col">
                <TextField
              placeholder="Enter Friend's Username"
              name="friendName"
            />
            <button className='text-white bg-purple-600' type="submit">
              Submit
            </button>
                </form>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default AddFriendModal