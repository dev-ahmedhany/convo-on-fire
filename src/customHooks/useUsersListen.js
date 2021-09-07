import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  documentId,
  getDocs,
} from "firebase/firestore";

const useUsersListen = (user) => {
  const [users, setUsers] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    if (user && !isListening) {
      const onNext = (querySnapshot) => {
        const chatArray = [];
        querySnapshot.forEach((doc) => {
          chatArray.push({ id: doc.id, ...doc.data() });
        });
        setUsers(chatArray);
      };
      setIsListening(true);
      const db = getFirestore();
      const chatsRef = collection(db, "users");
      const q = query(chatsRef, where(documentId(), "!=", user.uid));
      getDocs(q).then(onNext);
      unsubscribe = onSnapshot(q, onNext);
    }
    return unsubscribe;
  }, [user, isListening]);

  return { users };
};

export default useUsersListen;
