import { useCallback } from "react";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";

const useChatUser = (chats) => {
  const getDocId = useCallback(
    async (currentUserId, otherUserId) => {
      const docId = [currentUserId, otherUserId].sort().join("_");
      const chat = chats.find((chat) => chat.id === docId);
      if (chat) {
        return chat.id;
      } else {
        const db = getFirestore();

        setDoc(doc(db, "chats", docId), {
          createdAt: serverTimestamp(),
          createdBy: currentUserId,
          members: [otherUserId, currentUserId],
          messagesCount: 0,
          lastMessage: { timeStamp: serverTimestamp() },
        }).catch((error) => {
          console.log("createChat", error);
        });
        return docId;
      }
    },
    [chats]
  );

  return { getDocId };
};

export default useChatUser;
