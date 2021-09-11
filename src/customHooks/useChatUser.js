import { useCallback } from "react";
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

const useChatUser = (chats) => {
  const getDocId = useCallback(
    async (currentUserId, otherUserId) => {
      const chat = chats.find(
        (chat) => chat.between === [currentUserId, otherUserId].sort().join(",")
      );
      if (chat) {
        return chat.id;
      } else {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "chats"), {
          createdAt: serverTimestamp(),
          createdBy: currentUserId,
          type: 1,
          members: [otherUserId, currentUserId],
          between: [otherUserId, currentUserId].sort().join(","),
        });
        return docRef.id;
      }
    },
    [chats]
  );

  return { getDocId };
};

export default useChatUser;
