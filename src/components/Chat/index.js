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
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

const Chat = ({ user }) => {
  const classes = useStyles();
  const [selectedId, setSelectedID] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [selectedChatId, setSelectedChatId] = useState();
  const { users } = useUsersListen(user);
  const { getDocId } = useChatUser();
  const { messages, scrollDown, getNextMessages, disableLoadMore } = useChatID(
    selectedChat?.id,
    user
  );
  const { sendMessage } = useSendMessage();
  const { chats } = useChatsListen(user);

  const selectedUser = users.find((item) => item.id === selectedId);

  useEffect(() => {
    if (selectedChatId && chats.length > 0) {
      setSelectedChat(chats.find((chat) => chat.id === selectedChatId));
    }
  }, [chats, selectedChatId]);

  return (
    <Box display="flex" style={{ height: "100%" }}>
      <Grid container component={Paper}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Box
            display="flex"
            flexDirection="column"
            style={{ padding: "10px", height: "100%" }}
          >
            <Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                  </ListItemIcon>
                  <ListItemText primary={user.displayName}></ListItemText>
                </ListItem>
              </List>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Box>
            <List style={{ overflow: "auto", flexGrow: "1", height: "0px" }}>
              <Typography>chats</Typography>
              <ChatsList
                chats={chats}
                users={users}
                uid={user.uid}
                onClick={(e, id, uid) => {
                  setSelectedChatId(id);
                  setSelectedID(uid);
                }}
                selectedId={selectedChatId}
              />
              <Typography>all users</Typography>
              <UsersList
                users={users}
                onClick={async (e, id) => {
                  const docId = await getDocId(user.uid, id);
                  setSelectedChatId(docId);
                  setSelectedID(id);
                }}
              />
            </List>
          </Box>
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
                height: "100%",
              }}
            >
              <ChatWrapper
                data={messages}
                chat={selectedChat}
                userId={user.uid}
                users={users}
                scrollDown={scrollDown}
                getNextMessages={getNextMessages}
                disableLoadMore={disableLoadMore}
              />
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
