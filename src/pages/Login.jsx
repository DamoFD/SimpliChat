import React from 'react'

function Login() {
  return (
    <div className="container m-auto mt-20 rounded-xl">
        <h1 className="text-7xl text-center font-bold p-10 pb-8 text-white">Register</h1>
        <p className="text-gray-400 text-center text-xl">
          Need an account? Sign up
        </p>
        <form className="flex flex-col items-center">
        <TextField
            placeholder='Email'
            type='text'
        />
        <TextField
            placeholder='Password'
            type='text'
        />
        <button
              type="submit"
              className="m-5 w-1/3 rounded-md h-14 bg-purple-600 text-2xl text-white hover:bg-purple-700"
            >
              Log In
            </button>
            </form>
    </div>
  )
}

export default Login