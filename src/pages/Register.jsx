import React from "react";
import TextField from "../components/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import register from "../utils/signup";


function Register() {
  const navigate = useNavigate();

  return (
    <div className="container m-auto mt-20 rounded-xl">
      <h1 className="text-7xl text-center font-bold p-10 pb-8 text-white">
        Register
      </h1>
      <p className="text-gray-400 text-center text-xl">
        Have an account? Log in
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
            .required("Please enter your username.")
            .min(6, "Username is too short.")
            .max(28, "Username is too long."),
          email: Yup.string()
            .required("Please enter you email.")
            .email("Please enter a valid email address."),
          password: Yup.string()
            .required("Please enter your password.")
            .min(6, "Password is too short.")
            .max(28, "Password is too long."),
          confirmPassword: Yup.string()
            .required("Please confirm your password.")
            .oneOf([Yup.ref("password"), null], "Passwords mush match."),
        })}
        onSubmit={async (values, actions) => {
          try {
            await register({ ...values });
            actions.resetForm();
            navigate('/');
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
          }
        }}
        
      >
        {() => (
        <Form className="flex flex-col items-center">
          <TextField name="displayName" placeholder="Username" type="text" />
          <TextField name="email" placeholder="Email" type="email" />
          <TextField name="password" placeholder="Password" type="password" />
          <TextField
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
          <button
            type="submit"
            className="m-5 w-1/3 rounded-md h-14 bg-purple-600 text-2xl text-white hover:bg-purple-700"
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
