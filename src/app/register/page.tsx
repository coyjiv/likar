import React from 'react'
import RegisterForm from '../components/forms/RegisterForm'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <div className='flex h-screen py-44 justify-center bg-animation-gradient'><RegisterForm/></div>
  )
}

export default  RegisterPage