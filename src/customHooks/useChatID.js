import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const useChatID = (docID) => {
  const [, setUnsubscribe] = useState(() => () => {});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (docID) {
      const db = getFirestore();
      const q = query(
        collection(db, "messages", docID, "messages"),
        orderBy("sentAt")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const msg = doc.data();
          if (msg.sentAt) {
            const fullmessage = {
              id: doc.id,
              date: msg.sentAt.toDate(),
              ...msg,
            };
            messages.push(fullmessage);
          }
        });
        setMessages(messages);
      });
      setUnsubscribe((oldListener) => {
        oldListener();
        return unsubscribe;
      });

      return unsubscribe;
    }
  }, [docID]);

  return { messages };
};

export default useChatID;
