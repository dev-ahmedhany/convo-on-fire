import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

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
          // selected={selectedId === item.id}
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
