'use client';
import withAuth from '@/hooks/withAuth';
import React from 'react'
import withApplicationShell from '../components/AppShell'
import ProfileForm from '../components/forms/ProfileForm';


const Profile = () => {
  return (
    //@ts-ignore
        <ProfileForm/>
  )
}

export default withAuth(withApplicationShell(Profile))  