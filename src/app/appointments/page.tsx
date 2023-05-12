'use client';
import withAuth from '@/hooks/withAuth'
import React from 'react'
import withApplicationShell from '../components/AppShell'
import AppointmentsGrid from './AppointmentsGrid';
import DoctorHeader from './DoctorHeader';

type Props = {}

const AppointmentsPage = (props: Props) => {
  return (
    <><DoctorHeader avatar='' email='іваіва' name='іваіав' phone='23423' title='Ваш лікар' />
    <AppointmentsGrid/>
    </>
  )
}

export default withAuth(withApplicationShell(AppointmentsPage)) 