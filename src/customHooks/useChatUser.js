import { useEffect, useState } from "react";
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const useChatUser = (uid, user) => {
  const [docID, setDocID] = useState();

  useEffect(() => {
    if (uid) {
      const getID = async () => {
        const db = getFirestore();
        const chatsRef = collection(db, "chats");
        const q = query(
          chatsRef,
          where("between", "==", [user.uid, uid].sort().join(","))
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setDocID(doc.id);
          });
        } else {
          const docRef = await addDoc(collection(db, "chats"), {
            createdAt: serverTimestamp(),
            createdBy: user.uid,
            type: 1,
            members: [uid, user.uid],
            between: [uid, user.uid].sort().join(","),
          });
          setDocID(docRef.id);
        }
      };
      getID();
    }
  }, [user, uid]);

  return { docID };
};

export default useChatUser;
