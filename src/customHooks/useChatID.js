import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

const useChatID = (docID) => {
  const [, setUnsubscribe] = useState(()=>() => {});
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    if(docID){
      const db = getFirestore();
      const q = query(collection(db, "messages", docID, "messages"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
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
