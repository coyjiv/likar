import { IDoctor } from '@/types'
import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useAppSelector } from './redux'

const useCurrentDoctor = () => {
    const [doctor, setDoctor] = useState<IDoctor | null>(null)
    const firestore = useFirestore()
    // @ts-ignore Persist-gate is not typed
    const uid = useAppSelector((state) => state.firebase.auth.uid)
  
    useEffect(() => {
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

    return doctor
}

export default useCurrentDoctor