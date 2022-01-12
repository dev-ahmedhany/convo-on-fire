import { useCallback, useEffect, useRef, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const useChatID = (docID, user) => {
  const [messages, setMessages] = useState([]);
  const [scrollDown, setScrollDown] = useState(false);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const nextMessages = useRef([]);
  const lastDoc = useRef();
  const loadingNextMessages = useRef(false);

  const getNextMessages = useCallback(() => {
    if (lastDoc.current && !loadingNextMessages.current) {
      loadingNextMessages.current = true;
      const db = getFirestore();
      const q = query(
        collection(db, "chats", docID, "messages"),
        orderBy("sentAt", "desc"),
        startAfter(lastDoc.current),
        limit(20)
      );
      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          lastDoc.current = querySnapshot.docs[querySnapshot.docs.length - 1];
          const messages = [];
          querySnapshot.forEach((doc) => {
            const msg = doc.data();
            const fullmessage = {
              id: doc.id,
              date: msg.sentAt.toDate(),
              ...msg,
            };
            messages.push(fullmessage);
          });
          nextMessages.current = [
            ...messages.reverse(),
            ...nextMessages.current,
          ];
          setMessages((oldMessages) => [...messages, ...oldMessages]);
        } else {
          setDisableLoadMore(true);
        }
      });
      loadingNextMessages.current = false;
    }
  }, [docID]);

  const onNext = useCallback(
    (querySnapshot) => {
      //add laston to old messages
      let oldMessages = [];
      const changes = querySnapshot.docChanges();
      changes
        .filter((c) => c.type === "removed")
        .forEach((docChanges) => {
          const doc = docChanges.doc;
          const msg = doc.data();
          const fullmessage = {
            id: doc.id,
            date: msg.sentAt.toDate(),
            ...msg,
          };
          oldMessages.push(fullmessage);
        });

      //mark as seen
      const db = getFirestore();
      if (changes.filter((c) => c.type === "added").length > 0) {
        const data = {};
        data[`seen.${user.uid}`] = serverTimestamp();
        updateDoc(doc(db, "chats", docID), data);
      }

      nextMessages.current = [...nextMessages.current, ...oldMessages];

      const messages = [];
      const docs = querySnapshot.docs;
      if (!lastDoc.current) {
        lastDoc.current = docs[docs.length - 1];
      }
      querySnapshot.forEach((doc) => {
        const msg = doc.data();
        const fullmessage = {
          id: doc.id,
          date: msg.sentAt ? msg.sentAt.toDate() : false,
          ...msg,
        };
        messages.push(fullmessage);
      });
      setMessages([...nextMessages.current, ...messages.reverse()]);
      setScrollDown((oldState) => !oldState);
    },
    [user, docID]
  );

  useEffect(() => {
    if (docID) {
      nextMessages.current = [];
      lastDoc.current = null;
      setDisableLoadMore(false);
      const db = getFirestore();
      const q = query(
        collection(db, "chats", docID, "messages"),
        orderBy("sentAt", "desc"),
        limit(20)
      );
      return onSnapshot(q, onNext);
    }
  }, [docID, onNext]);

  return { messages, scrollDown, getNextMessages, disableLoadMore };
};

export default useChatID;
