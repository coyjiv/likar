'use client'
import withAuth from '@/hooks/withAuth'
import React from 'react'
import withApplicationShell from '../components/AppShell'

type Props = {}

const LabResults = (props: Props) => {
  return (
    <div>LabResults</div>
  )
}

export default withAuth(withApplicationShell(LabResults))