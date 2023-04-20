import React from 'react'
import TextField from '../components/TextField'

function Register() {
  return (
    <div className="container m-auto mt-20 rounded-xl">
        <h1 className="text-7xl text-center font-bold p-10 pb-8 text-white">Register</h1>
        <p className="text-gray-400 text-center text-xl">
          Have an account? Log in
        </p>
        <form className="flex flex-col items-center">
        <TextField
            placeholder='Username'
            type='text'
        />
        <TextField
            placeholder='Email'
            type='text'
        />
        <TextField
            placeholder='Password'
            type='text'
        />
        <TextField
            placeholder='Confirm Password'
            type='text'
        />
        <button
              type="submit"
              className="m-5 w-1/3 rounded-md h-14 bg-purple-600 text-2xl text-white hover:bg-purple-700"
            >
              Sign Up
            </button>
            </form>
    </div>
  )
}

export default Register