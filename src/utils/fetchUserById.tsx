import { doc, getDoc, getFirestore } from "firebase/firestore";

export const fetchUserById = async (id: string) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        throw new Error('User not found');
    }
    };