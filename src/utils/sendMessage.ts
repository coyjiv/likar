import { collection, addDoc, getFirestore } from "firebase/firestore";

export const sendMessage = async (senderId: any, recipientId: any, message: any) => {
  const timeSent = new Date().toISOString(); // current time in ISO format
  const db = getFirestore();
  
  try {
    await addDoc(collection(db, "chatMessages"), {
      senderId,
      recipientId,
      message,
      timeSent
    });

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};