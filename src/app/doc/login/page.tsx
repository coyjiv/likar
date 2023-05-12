'use client';

import { Box } from '@mantine/core'
import React from 'react'
import LoginForm from '@/app/components/forms/LoginForm';

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className={'flex h-screen py-0 sm:py-44 items-center justify-center bg-animation-gradient'}><LoginForm forDoc /></div>
  )
}

export default LoginPage