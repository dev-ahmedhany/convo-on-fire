import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const ChatList = () => {
  const data = [
    {
      id: "u123",
      displayName: "Remy Sharp",
      photoURL: "https://material-ui.com/static/images/avatar/1.jpg",
    },
    {
      id: "u456",
      displayName: "Alice",
      photoURL: "https://material-ui.com/static/images/avatar/3.jpg",
    },
    {
      id: "u789",
      displayName: "Cindy Baker",
      photoURL: "https://material-ui.com/static/images/avatar/2.jpg",
    },
  ];
  return (
    <List>
      {data.map((item) => (
        <ListItem button key={item.id}>
          <ListItemIcon>
            <Avatar alt={item.displayName} src={item.photoURL} />
          </ListItemIcon>
          <ListItemText primary={item.displayName}>
            {item.displayName}
          </ListItemText>
          {/* <ListItemText secondary="online" align="right"></ListItemText> */}
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
