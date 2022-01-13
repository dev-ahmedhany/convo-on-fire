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

  useEffect(() => {
    if (user) {
      const onNext = (querySnapshot) => {
        const chatArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          chatArray.push({
            id: doc.id,
            ...data,
            lastOnline: data.lastOnline ? data.lastOnline.toDate() : false,
          });
        });
        setUsers(chatArray);
      };
      const db = getFirestore();
      const chatsRef = collection(db, "users");
      const q = query(chatsRef, where(documentId(), "!=", user.uid));
      getDocs(q).then(onNext).catch((error)=>{console.log("usersGet",error);});
      const unsubscribe = onSnapshot(q, onNext,(error)=>{console.log("usersListen",error);});
      setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastOnline: serverTimestamp(),
      });
      return unsubscribe;
    }
  }, [user]);

  return { users };
};

export default useUsersListen;
