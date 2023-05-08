'use client';

import { Box } from '@mantine/core'
import React from 'react'
import LoginForm from '../components/forms/LoginForm'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <Box display={'flex'} h={'100vh'} className={'justify-center py-52 bg-animation-gradient'}><LoginForm/></Box>
  )
}

export default LoginPage