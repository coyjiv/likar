import {
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    where,
  } from 'firebase/firestore';
  import React, { useEffect, useState } from 'react';
import { useFirestore } from 'react-redux-firebase';


  
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
  
  export const useDoctorAppointments = (doctorUid:string) => {
    const firestore = useFirestore();
    const [appointments, setAppointments] = useState<any[]>([]);
    
    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, 'appointments'), where("doctorUid", "==", doctorUid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let appointments: any[] = [];
          snapshot.forEach(doc => appointments.push({...doc.data(), id: doc.id}));
          // dispatch an action to update your Redux store with the latest data
            setAppointments(appointments);
        });
    
        // cleanup function to stop listening for changes when the component unmounts
        return () => unsubscribe();
      }, [firestore, doctorUid]);
      return appointments;
  };
