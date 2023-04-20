import React, { useState } from "react";
import TextField from "../components/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import register from "../utils/signup";


function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="container m-auto mt-20 rounded-xl">
      <h1 className="text-7xl text-center font-bold p-10 pb-8 text-white">
        Register
      </h1>
      <p className="text-gray-400 text-center text-xl">
        Have an account? <Link to={"/login"}>Log in</Link>
      </p>
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          displayName: Yup.string()
            .required("Please enter a username.")
            .min(6, "Username is too short.")
            .max(28, "Username is too long."),
          email: Yup.string()
            .required("Please enter your email.")
            .email("Please enter a valid email address."),
          password: Yup.string()
            .required("Please enter a password.")
            .min(6, "Password is too short.")
            .max(28, "Password is too long."),
          confirmPassword: Yup.string()
            .required("Please confirm your password.")
            .oneOf([Yup.ref("password"), null], "Passwords must match."),
        })}
        onSubmit={async (values, actions) => {
          setLoading(true)
          try {
            await register({ ...values });
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
            <TextField name="displayName" placeholder="Username" type="text" />
            {touched.displayName && errors.displayName && (
              <p className='text-red-500'>{errors.displayName}</p>
            )}

            <TextField name="email" placeholder="Email" type="email" />
            {touched.email && errors.email && (
              <p className='text-red-500'>{errors.email}</p>
            )}

            <TextField name="password" placeholder="Password" type="password" />
            {touched.password && errors.password && (
              <p className='text-red-500'>{errors.password}</p>
            )}

            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword}</p>
            )}
          <button
            type="submit"
            className="m-5 w-1/3 rounded-md h-14 bg-purple-600 text-2xl text-white hover:bg-purple-700"
            disabled={loading}
          >
            Sign Up
          </button>
        </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
