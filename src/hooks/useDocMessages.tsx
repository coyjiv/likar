import { onSnapshot, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase';
import { getFirestore } from 'firebase/firestore';

type Props = {}

const useDocMessages = (userUid) => {
    const firestore = useFirestore();
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    
    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onSnapshot(collection(db, 'chatMessages'), (snapshot) => {
          let chatMessages: any[] = [];
          snapshot.forEach(doc => chatMessages.push({...doc.data(), id: doc.id}));
          // dispatch an action to update your Redux store with the latest data
            setChatMessages(chatMessages);
        });
    
        // cleanup function to stop listening for changes when the component unmounts
        return () => unsubscribe();
      }, [firestore, userUid]);
      return chatMessages
}

export default useDocMessages