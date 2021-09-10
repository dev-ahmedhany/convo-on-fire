import React from "react";
import Chat from "../components/Chat";

export default function Home({ user }) {
  return <Chat user={user} />;
}
