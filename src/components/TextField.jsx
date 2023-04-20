import React from 'react'
import {Field, useField} from 'formik';

function TextField({...props}) {
  const [field, meta] = useField(props);

  return (
    <input
        {...field}
        {...props}
        className='m-5 w-2/3 rounded-md h-14 bg-gray-600 text-2xl pl-3 text-white focus:shadow-purple focus:outline-none focus:ring focus:ring-purple-600'
    />
  )
}

export default TextField