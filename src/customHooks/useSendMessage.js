import { useCallback } from "react";
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

const useSendMessage = () => {
  const sendMessage = useCallback(async (msg, uid, docID, reply) => {
    const message = {
      sentAt: serverTimestamp(),
      sentBy: uid,
      message: msg,
    };
    if (reply) {
      message.reply = reply;
    }
    const db = getFirestore();
    await addDoc(collection(db, "chats", docID, "messages"), message);
  }, []);

  return { sendMessage };
};

export default useSendMessage;
