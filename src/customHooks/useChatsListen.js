import { useCallback, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

const useChatsListen = (user) => {
  const [chats, setChats] = useState([]);

  const onNext = useCallback((querySnapshot) => {
    const chatArray = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const finalData = {
        id: doc.id,
        members: data.members,
        seen: data.seen || {},
      };
      for (const [key, value] of Object.entries(finalData.seen)) {
        if (value) {
          finalData.seen[key] = value.toDate();
        }
      }
      chatArray.push(finalData);
    });
    setChats(chatArray);
  }, []);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const q = query(
        collection(db, "chats"),
        where("members", "array-contains", user.uid),
        orderBy("lastMessage.sentAt", "desc"),
        limit(20)
      );
      return onSnapshot(q, onNext, (error) => {
        console.log("chats", error.message);
      });
    }
  }, [user, onNext]);

  return { chats };
};

export default useChatsListen;
