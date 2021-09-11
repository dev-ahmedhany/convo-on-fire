import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

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
                onClick(e, item);
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
