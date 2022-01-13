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
      const data = doc.data();
      const finalData = {
        id: doc.id,
        type: data.type,
        members: data.members,
        seen: data.seen || {},
        between: data.between,
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
        where("members", "array-contains", user.uid)
      );
      return onSnapshot(q, onNext,(error)=>{console.log("chats",error);});
    }
  }, [user, onNext]);

  return { chats };
};

export default useChatsListen;
