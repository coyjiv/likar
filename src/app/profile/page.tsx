'use client';
import { Box, Avatar, createStyles } from '@mantine/core';
import React from 'react'
import withApplicationShell from '../components/AppShell'
import ProfileForm from '../components/forms/ProfileForm';

type Props = {}

const styles = createStyles((theme) => ({
    profileWrapper:{
        backgroundColor: 'black',
        padding: theme.spacing.md,

    }
}))

const Profile = (props: Props) => {
  return (
    //@ts-ignore
        <ProfileForm/>
  )
}

export default withApplicationShell(Profile) 