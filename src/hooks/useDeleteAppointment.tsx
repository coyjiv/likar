import { collection, doc, deleteDoc, updateDoc, arrayRemove, getFirestore } from "firebase/firestore";
import { useFirestore } from "react-redux-firebase";

export function useDeleteAppointment() {
  const firestore = useFirestore()

  const deleteAppointment = async (
    doctorUid: string,
    userUid: string,
    appointmentId: string,
  ) => {
    try {
      firestore.collection('appointments').doc(appointmentId).delete()
      await Promise.all([
        firestore.collection('users').doc(userUid).update({
          appointments: arrayRemove(appointmentId),
        }),
        firestore.collection('doctors').doc(doctorUid).update({
          appointments: arrayRemove(appointmentId),
        }),
      ]);
      
      console.log('Deleted appointment with ID: ', appointmentId);
    } catch (error) {
      console.error('Error deleting appointment: ', error);
      throw error;
    }
  }

  return deleteAppointment;
}
