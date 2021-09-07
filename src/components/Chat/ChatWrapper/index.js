import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ChatMsg from "../ChatMsg";

const ChatWrapper = ({ data, userId }) => {
  const messages = [];

  data.forEach((msg) => {
    if (messages.length === 0) {
      messages.push({
        type: "Date",
        date: msg.date.toLocaleString("en-US", {
          day: "numeric",
          //year: 'numeric',
          month: "short",
          hour: "numeric",
          minute: "numeric",
        }),
      });
      messages.push({
        ...msg,
        messages: [msg.message],
        side: userId === msg.uid ? "right" : "left",
      });
    } else {
      if (
        msg.date.getTime() - messages[messages.length - 1].date.getTime() >
        10 * 60 * 1000
      ) {
        messages.push({
          type: "Date",
          date: msg.date.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
          }),
        });
        messages.push({
          ...msg,
          messages: [msg.message],
          side: userId === msg.uid ? "right" : "left",
        });
      } else {
        if (messages[messages.length - 1].uid === msg.uid) {
          messages[messages.length - 1].messages.push(msg.message);
        } else {
          messages.push({
            ...msg,
            messages: [msg.message],
            side: userId === msg.uid ? "right" : "left",
          });
        }
      }
    }
  });

  return (
    <Paper elevation={0}>
      {messages.map((msg) =>
        msg.type === "Date" ? (
          <>
            <Typography
              style={{
                fontSize: "11px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#8a8d91",
              }}
            >
              {msg.date}
            </Typography>
          </>
        ) : (
          <ChatMsg
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
