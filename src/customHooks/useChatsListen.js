import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const useChatsListen = (user) => {
  const [chats, setChats] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (user && !isListening) {
      setIsListening(true);
      const db = getFirestore();
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("members", "array-contains", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatArray = [];
        querySnapshot.forEach((doc) => {
          chatArray.push({ id: doc.id, ...doc.data() });
        });
        setChats(chatArray);
      });
      return unsubscribe;
    }
  }, [user, isListening]);

  return { chats };
};

export default useChatsListen;
