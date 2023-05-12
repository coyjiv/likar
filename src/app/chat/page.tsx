'use client';

import withAuth from '@/hooks/withAuth';
import React from 'react'
import withApplicationShell from '../components/AppShell';

type Props = {}

const ChatPage = (props: Props) => {
  return (
    <div>ChatPage</div>
  )
}

export default withAuth(withApplicationShell(ChatPage))