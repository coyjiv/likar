import { collection, addDoc, doc, setDoc, updateDoc, arrayUnion, getFirestore } from "firebase/firestore";

export function useCreateAppointment() {
  const db = getFirestore()

  const createAppointment = async (
    doctorUid: string,
    userUid: string,
    appointmentData: {
      timeStart: string
      timeEnd: string
      date: Date
      additionalInfo: string
    }
  ) => {
    try {
      // Create the new appointment in Firestore
      const appointmentRef = await addDoc(collection(db, 'appointments'), {
        ...appointmentData,
        doctorUid,
        userUid,
      });

      // Get the ID of the newly created appointment
      const appointmentId = appointmentRef.id;

      console.log('Created appointment with ID: ', appointmentId);
      
      // Update the user and doctor documents in Firestore
      await Promise.all([
        updateDoc(doc(db, 'users', userUid), {
          appointments: arrayUnion(appointmentId),
        }),
        updateDoc(doc(db, 'doctors', doctorUid), {
          appointments: arrayUnion(appointmentId),
        }),
      ]);

      return appointmentId;
    } catch (error) {
      console.error('Error creating appointment: ', error);
      throw error;
    }
  }

  return createAppointment;
}
