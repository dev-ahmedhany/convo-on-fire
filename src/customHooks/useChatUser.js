import { useCallback } from "react";
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const useChatUser = () => {
  const getDocId = useCallback(async (currentUserId, otherUserId) => {
    const db = getFirestore();
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("between", "==", [currentUserId, otherUserId].sort().join(","))
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      const docRef = await addDoc(collection(db, "chats"), {
        createdAt: serverTimestamp(),
        createdBy: currentUserId,
        type: 1,
        members: [otherUserId, currentUserId],
        between: [otherUserId, currentUserId].sort().join(","),
      });
      return docRef.id;
    }
  }, []);

  return { getDocId };
};

export default useChatUser;
