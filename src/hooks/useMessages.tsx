import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, getFirestore, orderBy } from "firebase/firestore";
import { isLoaded, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useAppSelector } from './redux';
import dayjs from 'dayjs';

const useMessages = (userUid, doctorId) => {
    const firestore = useFirestore();
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    
    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onSnapshot(collection(db, 'chatMessages'), (snapshot) => {
          let chatMessages: any[] = [];
          snapshot.forEach(doc => chatMessages.push({...doc.data(), id: doc.id}));
          // dispatch an action to update your Redux store with the latest data
          chatMessages.sort((a, b) => {
            const dateA = new Date(a.timeSent);
            const dateB = new Date(b.timeSent);
            return dateB.getTime() - dateA.getTime();
        });
            setChatMessages(chatMessages);
        });
        
    
        // cleanup function to stop listening for changes when the component unmounts
        return () => unsubscribe();
      }, [firestore, userUid]);
      return chatMessages.filter(message => (message.recipientId === userUid && message.senderId === doctorId) || (message.senderId === userUid && message.recipientId === doctorId)).map(message => ({...message, timeSent: dayjs(message.timeSent).format('HH:mm DD/MM')}))

};

export default useMessages;
