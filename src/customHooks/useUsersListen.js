import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  documentId,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const useUsersListen = (user) => {
  const [users, setUsers] = useState([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
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
      const unsubscribe = onSnapshot(q, onNext);
      setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastOnline: serverTimestamp(),
      });
      return unsubscribe;
    }
  }, [user, isListening]);

  return { users };
};

export default useUsersListen;
