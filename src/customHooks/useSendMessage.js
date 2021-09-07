import { useCallback } from "react";
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

const useSendMessage = () => {
  const sendMessage = useCallback(async (msg, uid, docID) => {
    const db = getFirestore();
    await addDoc(collection(db, "messages", docID, "messages"), {
      sentAt: serverTimestamp(),
      sentBy: uid,
      message: msg,
    });
  }, []);

  return { sendMessage };
};

export default useSendMessage;
