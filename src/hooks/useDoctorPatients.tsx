import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";
import { getFirestore } from "firebase/firestore";
import { useAppSelector } from "./redux";


const useDoctorPatients = () => {
    // @ts-ignore
    const uid = useAppSelector(state=>state.firebase.auth.uid)
    
    const firestore = useFirestore();
    const [patients, setPatients] = useState<any[]>([]);
    
    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, 'users'), where("assignedDoctor", "==", uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let patients: any[] = [];
          snapshot.forEach(doc => patients.push({...doc.data(), id: doc.id}));
          // dispatch an action to update your Redux store with the latest data
            setPatients(patients);
        });
    
        // cleanup function to stop listening for changes when the component unmounts
        return () => unsubscribe();
      }, [firestore, uid]);
      return patients;
}

export default useDoctorPatients