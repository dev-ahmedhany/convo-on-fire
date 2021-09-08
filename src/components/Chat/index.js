import React, { useState } from "react";
import ChatWrapper from "./ChatWrapper";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import useUsersListen from "../../customHooks/useUsersListen";
import useChatUser from "../../customHooks/useChatUser";
import useChatID from "../../customHooks/useChatID";
import useSendMessage from "../../customHooks/useSendMessage";

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

// const template = [
//   {
//     name: "Ahmed Hany",
//     avatar: "",
//   }
// ];

const Chat = ({ user }) => {
  const classes = useStyles();
  const [selectedId, setSelectedID] = useState();
  const { users } = useUsersListen(user);
  const { docID } = useChatUser(selectedId, user);
  const { messages } = useChatID(docID);
  const { sendMessage } = useSendMessage();

  const selectedUser = users.find((item) => item.id === selectedId);

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
          <ChatList
            users={users}
            onClick={(e, id) => {
              setSelectedID(id);
            }}
            selectedId={selectedId}
          />
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
              <ChatWrapper data={messages} userId={user.uid} users={users} />
              <Divider />
              <ChatInput
                handleSendMessage={(msg) => {
                  sendMessage(msg, user.uid, docID);
                }}
                handleTyping={() => {}}
                disabled={!docID}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
