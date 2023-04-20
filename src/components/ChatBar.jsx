import TextField from './TextField'
import React from 'react'

function ChatBar() {
  return (
    <>
      <form className='w-full flex'>
        <TextField
          placeholder="Type message here..."
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default ChatBar