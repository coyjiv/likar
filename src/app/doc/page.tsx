'use client'

import { useAppSelector } from '@/hooks/redux'
import { useState } from 'react'
import withApplicationShell from '../components/AppShell'
import withDocAuth from '@/hooks/withDocAuth'
import Greeting from '../components/Greeting/Greeting'

function Home() {
  // @ts-ignore
  const currentUser = useAppSelector((state) => state.firebase.profile)

  return (
    <Greeting currentUser={currentUser}/>
  )
}

export default withDocAuth(withApplicationShell(Home))
