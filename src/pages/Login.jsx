import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import signIn from '../utils/signin';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container m-auto mt-20 rounded-xl">
        <h1 className="text-7xl text-center font-bold p-10 pb-8 text-white">Register</h1>
        <p className="text-gray-400 text-center text-xl">
          Need an account? <Link to={'/register'}>Sign up</Link>
        </p>
        <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Please enter your email.")
            .email("Please enter a valid email address."),
          password: Yup.string()
            .required("Please enter a password.")
            .min(6, "Password is too short.")
            .max(28, "Password is too long."),
        })}
        onSubmit={async (values, actions) => {
          setLoading(true)
          try {
            await signIn({ ...values });
            setLoading(false)
            actions.resetForm();
            navigate('/');
          } catch (error) {
            setLoading(false);
            const errorMessage = error.message;
            console.error(errorMessage);
          }
        }}
        
      >
        {({ errors, touched }) => (
        <Form className="flex flex-col items-center">
        <TextField
            placeholder='Email'
            type='email'
            name='email'
        />
        {touched.email && errors.email && (
              <p className='text-red-500'>{errors.email}</p>
            )}
        <TextField
            placeholder='Password'
            type='password'
            name='password'
        />
        {touched.password && errors.password && (
              <p className='text-red-500'>{errors.password}</p>
            )}
        <button
              type="submit"
              className="m-5 w-1/3 rounded-md h-14 bg-purple-600 text-2xl text-white hover:bg-purple-700"
              disabled={loading}
            >
              Log In
            </button>
            </Form>
        )}
        </Formik>
    </div>
  )
}

export default Login