import {
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    where,
  } from 'firebase/firestore';
  import React, { useEffect, useMemo, useState } from 'react';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
  import { useAppSelector } from './redux';

  
  const useAppointments = (userUid:string) => {
    const firestore = useFirestore();
    const [appointments, setAppointments] = useState<any[]>([]);
    
    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, 'appointments'), where("userUid", "==", userUid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let appointments: any[] = [];
          snapshot.forEach(doc => appointments.push({...doc.data(), id: doc.id}));
          // dispatch an action to update your Redux store with the latest data
            setAppointments(appointments);
        });
    
        // cleanup function to stop listening for changes when the component unmounts
        return () => unsubscribe();
      }, [firestore, userUid]);
      return appointments;
  };
  
  export default useAppointments;
  