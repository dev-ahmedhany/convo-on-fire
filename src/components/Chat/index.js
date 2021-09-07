import React from "react";
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
  messageArea: {
    flexGrow: "2",
    overflowY: "auto",
  },
});

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

const userId = "uid456";

const Chat = ({ user }) => {
  const classes = useStyles();
  const { users } = useUsersListen(user);

  return (
    <Box display="flex" style={{ height: "100%" }}>
      <Grid container component={Paper}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="" src={user.photoURL} />
              </ListItemIcon>
              <ListItemText primary={user.displayName}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <ChatList users={users} />
        </Grid>
        <Grid item xs={9}>
          <Box display="flex" flexDirection="column" style={{ height: "100%" }}>
            <Box display="flex" flex={1} className={classes.messageArea}>
              <ChatWrapper data={data} userId={userId} />
            </Box>
            <div>
              <Divider />
              <ChatInput handleSendMessage={() => {}} handleTyping={() => {}} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
