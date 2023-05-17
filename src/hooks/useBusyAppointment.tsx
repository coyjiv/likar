import  { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseDateToString } from '@/utils/firebaseDateToString';

const useBusyAppointment = (doctorUid:string) => {
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
      return appointments.map(el=>({...el, date: firebaseDateToString(el.date)}));
}

export default useBusyAppointment