'use client';

import { Box } from '@mantine/core'
import React from 'react'
import LoginForm from '@/app/components/forms/LoginForm';

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className={'flex flex-col h-screen py-0 sm:py-44 items-center justify-center bg-animation-gradient'}>
      <h1 className='text-3xl text-white mb-10 font-light'>Панель лікаря</h1>
      <LoginForm forDoc /></div>
  )
}

export default LoginPage