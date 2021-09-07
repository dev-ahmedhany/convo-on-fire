import { useEffect, useState } from "react";
import {
  getFirestore,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";

const useChatsListen = (user) => {
  const [chats, setChats] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    if (user && !isListening) {
      setIsListening(true);
      const db = getFirestore();
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("members", "array-contains", user.uid));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatArray = [];
        querySnapshot.forEach((doc) => {
          chatArray.push({ id: doc.id, ...doc.data() });
        });
        setChats(chatArray);
        console.log("Current chats in for this user: ", chatArray);
        setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastOnline: serverTimestamp(),
        });
      });
    }
    return unsubscribe;
  }, [user, isListening]);

  return { chats };
};

export default useChatsListen;
