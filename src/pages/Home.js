import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function Home({ uid }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("members", "array-contains", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatArray = [];
      querySnapshot.forEach((doc) => {
        chatArray.push({ id: doc.id, ...doc.data() });
      });
      setChats(chatArray);
      console.log("Current chats in for this user: ", chatArray);
    });
    return unsubscribe;
  }, [uid]);

  return <Chat chats={chats} />;
}
