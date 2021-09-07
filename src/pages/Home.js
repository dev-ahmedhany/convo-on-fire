import React from "react";
import Chat from "../components/Chat";
import useChatsListen from "../customHooks/useChatsListen";

export default function Home({ user }) {
  const { chats } = useChatsListen(user);
  return <Chat chats={chats} user={user} />;
}
