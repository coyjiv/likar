import { useAppSelector } from '@/hooks/redux'
import useAppointments from '@/hooks/useAppointments'
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
  Button,
} from '@mantine/core'
import { compose } from '@reduxjs/toolkit'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from '../store'
import AppointmentsList from './AppointmentsList'
import CreateAppointment from './CreateAppointment'

type Props = {}

const PRIMARY_COL_HEIGHT = rem(300)

const uid = getAuth()?.currentUser?.uid

const AppointmentsGrid = (props: Props) => {
  const theme = useMantineTheme()
  const user = useAppSelector(state=>state.firebase.auth)
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`
  const appointmentsData = useAppSelector(state=>state.firestore.data.appointments)
  const [loading, setLoading] = useState(true)
  const [creationMode, setCreationMode] = useState(false)
  const appointments = useAppointments(user.uid)


  console.log(appointments);
  

  const renderExpression = creationMode ? (
    <CreateAppointment setCreationMode={setCreationMode} />
  ) : <AppointmentsList creationMode={creationMode} appointments={appointments} setCreationMode={setCreationMode} />

  return (
    <Container my='md' maw={'100%'} h={'80%'} px={0}>
        <div className=' h-full'>{renderExpression}</div>
    </Container>
  )
}

export default AppointmentsGrid
