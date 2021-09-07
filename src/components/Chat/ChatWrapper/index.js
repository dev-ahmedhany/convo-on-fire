import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ChatMsg from "../ChatMsg";

const ChatWrapper = ({ data, userId, users }) => {
  const messages = [];

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
    return {
      ...msg,
      name: users.find((user) => user.id === msg.sentBy)?.displayName,
      avatar: users.find((user) => user.id === msg.sentBy)?.photoURL,
      messages: [msg.message],
      side: userId === msg.sentBy ? "right" : "left",
    };
  };

  data.forEach((msg) => {
    if (messages.length === 0) {
      messages.push(getDateObject(msg));
      messages.push(getMessageObject(msg));
    } else {
      if (
        msg.date.getTime() - messages[messages.length - 1].date.getTime() >
        10 * 60 * 1000
      ) {
        messages.push(getDateObject(msg));
        messages.push(getMessageObject(msg));
      } else {
        if (messages[messages.length - 1].sentBy === msg.sentBy) {
          messages[messages.length - 1].messages.push(msg.message);
        } else {
          messages.push(getMessageObject(msg));
        }
      }
    }
  });

  return (
    <Paper elevation={0} style={{ flex: "auto" }}>
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
    </Paper>
  );
};

export default ChatWrapper;
