import React, { useEffect, useState } from "react";
import ChatWrapper from "./ChatWrapper";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Grid,
  Box,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import ChatInput from "./ChatInput";
import UsersList from "./UsersList";
import useUsersListen from "../../customHooks/useUsersListen";
import useChatUser from "../../customHooks/useChatUser";
import useChatID from "../../customHooks/useChatID";
import useSendMessage from "../../customHooks/useSendMessage";
import useChatsListen from "../../customHooks/useChatsListen";
import ChatsList from "./ChatsList";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

const Chat = ({ user }) => {
  const classes = useStyles();
  const [selectedId, setSelectedID] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const { users } = useUsersListen(user);
  const { doc } = useChatUser(selectedId, user);
  const { messages, scrollDown, getNextMessages, disableLoadMore } = useChatID(
    selectedChat?.id,
    user
  );
  const { sendMessage } = useSendMessage();
  const { chats } = useChatsListen(user);

  const selectedUser = users.find((item) => item.id === selectedId);

  useEffect(() => {
    setSelectedChat(doc);
  }, [doc]);

  return (
    <Box display="flex" style={{ height: "100%" }}>
      <Grid container component={Paper}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Avatar alt={user.displayName} src={user.photoURL} />
              </ListItemIcon>
              <ListItemText primary={user.displayName}></ListItemText>
            </ListItem>
          </List>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <Typography>chats</Typography>
            <ChatsList
              chats={chats}
              users={users}
              uid={user.uid}
              onClick={(e, id) => {
                setSelectedChat(id);
              }}
              selectedId={selectedChat?.id}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <Typography>all users</Typography>
            <UsersList
              users={users}
              onClick={(e, id) => {
                setSelectedID(id);
              }}
              selectedId={selectedId}
            />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Box display="flex" flexDirection="column" style={{ height: "100%" }}>
            {selectedId && (
              <>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar
                        alt={selectedUser.displayName}
                        src={selectedUser.photoURL}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={selectedUser.displayName}
                    ></ListItemText>
                  </ListItem>
                </List>
                <Divider />
              </>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                height: "calc(100vh - 200px)",
              }}
            >
              {selectedChat && (
                <ChatWrapper
                  data={messages}
                  members={selectedChat.members}
                  userId={user.uid}
                  users={users}
                  scrollDown={scrollDown}
                  getNextMessages={getNextMessages}
                  disableLoadMore={disableLoadMore}
                />
              )}
              <Divider />
              <ChatInput
                handleSendMessage={(msg) => {
                  sendMessage(msg, user.uid, selectedChat.id);
                }}
                handleTyping={() => {}}
                disabled={!selectedChat}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
