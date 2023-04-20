import TextField from './TextField'
import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";

function ChatBar() {
  return (
    <>
      <Formik
        initialValues={{message: ""}}
        validationSchema={Yup.object({
          message: Yup.string().min(1).max(255),
        })}
        onSubmit={(values, actions) => {
          actions.resetForm();
        }}
        >
      <Form className='w-full flex'>
        <TextField
          placeholder="Type message here..."
          name="message"
        />
        <button type='submit'>Submit</button>
      </Form>
      </Formik>
    </>
  )
}

export default ChatBar