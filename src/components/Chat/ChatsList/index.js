import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";

const ChatsList = ({ chats, onClick, selectedId, uid, users }) => {
  return (
    <List>
      {chats
        .filter((chat) => chat.type === 1)
        .map((item) => {
          const memberID = item.members.filter((member) => member !== uid)[0];
          const user = users.filter((user) => user.id === memberID)[0];
          return (
            <ListItem
              button
              key={item.id}
              onClick={(e) => {
                onClick(e, item.id, user.id);
              }}
              selected={selectedId === item.id}
            >
              <ListItemIcon>
                <Avatar alt={user.displayName} src={user.photoURL} />
              </ListItemIcon>
              <ListItemText primary={user.displayName}>
                {user.displayName}
              </ListItemText>
              {/* <ListItemText secondary="online" align="right"></ListItemText> */}
            </ListItem>
          );
        })}
    </List>
  );
};

export default ChatsList;
