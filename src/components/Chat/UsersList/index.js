import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const UsersList = ({ users, onClick, selectedId }) => {
  return (
    <List>
      {users.map((item) => (
        <ListItem
          button
          key={item.id}
          onClick={(e) => {
            onClick(e, item.id);
          }}
        >
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

export default UsersList;
