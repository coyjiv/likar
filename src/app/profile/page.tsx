'use client';
import withAuth from '@/hooks/withAuth';
import React, { ReactNode } from 'react'
import withApplicationShell from '../components/AppShell'
import ProfileForm from '../components/forms/ProfileForm';


const Profile = () => {
  return (
        <ProfileForm/>
  )
}

export default withAuth(withApplicationShell(Profile))  