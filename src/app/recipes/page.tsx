'use client'
import withAuth from '@/hooks/withAuth'
import React from 'react'
import withApplicationShell from '../components/AppShell'

type Props = {}

const Recipes = (props: Props) => {
  return (
    <div>Recipes</div>
  )
}

export default withAuth(withApplicationShell(Recipes))