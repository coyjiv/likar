import React from 'react'
import RegisterForm from '@/app/components/forms/RegisterForm'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <div className='flex flex-col h-screen py-0 sm:py-44 items-center justify-center bg-animation-gradient'>
        <h1 className='text-3xl absolute top-20 left-1/2 -translate-x-1/2  text-white mb-10 font-light'>Панель лікаря</h1><RegisterForm forDoc/></div>
  )
}

export default  RegisterPage