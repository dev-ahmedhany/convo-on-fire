import { useCallback, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const useChatsListen = (user) => {
  const [chats, setChats] = useState([]);

  const onNext = useCallback((querySnapshot) => {
    const chatArray = [];
    querySnapshot.forEach((doc) => {
      chatArray.push({ id: doc.id, ...doc.data() });
    });
    setChats(chatArray);
  }, []);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const q = query(
        collection(db, "chats"),
        where("members", "array-contains", user.uid)
      );
      return onSnapshot(q, onNext);
    }
  }, [user, onNext]);

  return { chats };
};

export default useChatsListen;
