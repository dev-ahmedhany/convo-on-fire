import { useCallback } from "react";
import {
  getFirestore,
  serverTimestamp,
  increment,
  writeBatch,
  doc,
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
    const batch = writeBatch(db);
    batch.set(doc(collection(db,`chats/${docID}/messages`)), message);
    batch.update(doc(db, "chats", docID), {
      messagesCount: increment(1),
      lastMessage: {
        sentAt: serverTimestamp(),
        sentBy: uid,
        message: msg,
      },
    });
    await batch.commit();
  }, []);

  return { sendMessage };
};

export default useSendMessage;
