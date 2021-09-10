import { Button, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ChatMsg from "../ChatMsg";

const ChatWrapper = ({
  data,
  userId,
  users,
  scrollDown,
  getNextMessages,
  disableLoadMore,
}) => {
  const [messages, setMessages] = useState([]);
  const scrollableListRef = useRef(null);

  useEffect(() => {
    const getDateObject = (msg) => {
      return {
        type: "Date",
        date: msg.date.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "numeric",
        }),
      };
    };

    const getMessageObject = (msg) => {
      const sender = users.find((user) => user.id === msg.sentBy);
      return {
        ...msg,
        name: sender?.displayName,
        avatar: sender?.photoURL,
        messages: [{ text: msg.message, date: msg.date, id: msg.id }],
        side: userId === msg.sentBy ? "right" : "left",
      };
    };

    const msgs = [];
    if (data.length === 0) {
      setMessages([]);
    } else {
      data.forEach((msg) => {
        if (msgs.length === 0) {
          msgs.push(getDateObject(msg));
          msgs.push(getMessageObject(msg));
        } else {
          if (
            msg.date &&
            msg.date.getTime() - msgs[msgs.length - 1].date.getTime() >
              10 * 60 * 1000
          ) {
            msgs.push(getDateObject(msg));
            msgs.push(getMessageObject(msg));
          } else {
            if (msgs[msgs.length - 1].sentBy === msg.sentBy) {
              msgs[msgs.length - 1].messages.push({
                text: msg.message,
                date: msg.date,
                id: msg.id,
              });
            } else {
              msgs.push(getMessageObject(msg));
            }
          }
        }
        setMessages(msgs);
      });
    }
  }, [data, userId, users]);

  // handles scroll events on new message added
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollableListRef?.current) {
        scrollableListRef.current.scroll({
          top: scrollableListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [scrollDown]);

  return (
    <Paper ref={scrollableListRef} elevation={0} style={{ overflow: "auto" }}>
      {messages?.length > 0 && (
        <>
          <Button disabled={disableLoadMore} onClick={getNextMessages}>
            Load more
          </Button>
          {messages.map((msg) =>
            msg.type === "Date" ? (
              <Typography
                key={msg.date}
                style={{
                  fontSize: "11px",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#8a8d91",
                }}
              >
                {msg.date}
              </Typography>
            ) : (
              <ChatMsg
                key={msg.id}
                side={msg.side}
                name={msg.name}
                date={msg.date}
                avatar={msg.avatar}
                messages={msg.messages}
              />
            )
          )}
        </>
      )}
    </Paper>
  );
};

export default ChatWrapper;
