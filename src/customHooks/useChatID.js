import { useCallback, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";

const useChatID = (docID) => {
  const [messages, setMessages] = useState([]);
  const [nextMessages, setNextMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [next, setNext] = useState(0);

  useEffect(() => {
    if (next > 0 && lastDoc && messages.length === 20) {
      const db = getFirestore();
      const q = query(
        collection(db, "messages", docID, "messages"),
        orderBy("sentAt", "desc"),
        startAfter(lastDoc),
        limit(20)
      );
      getDocs(q).then((querySnapshot) => {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        const messages = [];
        querySnapshot.forEach((doc) => {
          const msg = doc.data();
          if (msg.sentAt) {
            const fullmessage = {
              id: doc.id,
              date: msg.sentAt.toDate(),
              ...msg,
            };
            messages.push(fullmessage);
          }
        });
        setNextMessages((nextMessages) => [
          ...messages.reverse(),
          ...nextMessages,
        ]);
        setMessages((oldMessages) => [...messages.reverse(), ...oldMessages]);
      });
    }
  }, [next, lastDoc, docID, messages.length]);

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
          if (msg.sentAt) {
            const fullmessage = {
              id: doc.id,
              date: msg.sentAt.toDate(),
              ...msg,
            };
            oldMessages.push(fullmessage);
          }
        });

      setNextMessages((nextMessages) => [...nextMessages, ...oldMessages]);

      const messages = [];
      const docs = querySnapshot.docs;
      if (!lastDoc) {
        setLastDoc(docs[docs.length - 1]);
      }
      querySnapshot.forEach((doc) => {
        const msg = doc.data();
        if (msg.sentAt) {
          const fullmessage = {
            id: doc.id,
            date: msg.sentAt.toDate(),
            ...msg,
          };
          messages.push(fullmessage);
        }
      });
      setMessages([...nextMessages, ...messages.reverse()]);
    },
    [lastDoc,nextMessages]
  );

  useEffect(() => {
    if (docID) {
      const db = getFirestore();
      const q = query(
        collection(db, "messages", docID, "messages"),
        orderBy("sentAt", "desc"),
        limit(20)
      );
      return onSnapshot(q, onNext);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docID]);

  return { messages, setNext };
};

export default useChatID;
