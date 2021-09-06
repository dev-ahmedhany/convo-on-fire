import { Paper, Typography } from "@material-ui/core";
import React from "react";
import ChatMsg from "../ChatMsg";

const data = [
  {
    uid: "uid123",
    name: "Ahmed Hany",
    avatar: "",
    message: "Hi Jenny, How r u today?",
    date: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    uid: "uid123",
    name: "Ahmed Hany",
    avatar: "",
    message: "Did you train yesterday",
    date: new Date(Date.now() - 59 * 60 * 1000),
  },
  {
    uid: "uid123",
    name: "Ahmed Hany",
    avatar: "",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
    date: new Date(Date.now() - 58 * 60 * 1000),
  },
  {
    uid: "uid456",
    name: "Hemmy",
    avatar: "",
    message: "Great! What's about you?",
    date: new Date(Date.now() - 57 * 60 * 1000),
  },
  {
    uid: "uid456",
    name: "Hemmy",
    avatar: "",
    message: "Of course I did. Speaking of which check this out",
    date: new Date(Date.now() - 56 * 60 * 1000),
  },
  {
    uid: "uid123",
    name: "Ahmed Hany",
    avatar: "",
    message: "Im good.",
    date: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    uid: "uid123",
    name: "Ahmed Hany",
    avatar: "",
    message: "See u later.",
    date: new Date(Date.now() - 44 * 60 * 1000),
  },
];

const messages = [];
const userId = "uid456";

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

const ChatWrapper = () => (
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

export default ChatWrapper;
