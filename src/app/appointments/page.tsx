'use client'
import { useAppSelector } from '@/hooks/redux'
import withAuth from '@/hooks/withAuth'
import React, { useEffect, useState } from 'react'
import { isEmpty, isLoaded, populate, useFirestore } from 'react-redux-firebase'
import withApplicationShell from '../components/AppShell'
import AppointmentsGrid from './AppointmentsGrid'
import DoctorHeader from './DoctorHeader'
import { IDoctor } from '@/types'

type Props = {}

const AppointmentsPage = (props: Props) => {
  const [doctor, setDoctor] = useState<IDoctor | null>(null)
  const firestore = useFirestore()
  // @ts-ignore Persist-gate is not typed
  const uid = useAppSelector((state) => state.firebase.auth.uid)
  console.log(doctor)

  useEffect(() => {
    if(!uid) return
    const fetchDoctor = async () => {
      const userDoc = await firestore.collection('users').doc(uid).get()
      const userData = userDoc.data()
      const doctorDoc: any = await firestore
        .collection('doctors')
        .doc(userData?.assignedDoctor)
        .get()
      if (doctorDoc != null) setDoctor(doctorDoc.data())
    }

    fetchDoctor()
  }, [firestore, uid])

  if (!doctor || !uid) return null // Loading
  return (
    <>
      <DoctorHeader
        avatar=''
        email={doctor?.email ?? ''}
        name={`${doctor?.firstName ?? ''} ${doctor?.lastName ?? ''} ${
          doctor?.middleName ?? ''
        }`}
        phone={doctor?.phoneNumber ?? ''}
        title='Ваш лікар'
      />
      {!isEmpty(uid) && <AppointmentsGrid />
      } 
    </>
  )
}

export default withAuth(withApplicationShell(AppointmentsPage))
