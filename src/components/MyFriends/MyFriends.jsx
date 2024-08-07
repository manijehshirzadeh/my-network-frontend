import { useState, useEffect, useContext, Fragment } from "react";
import * as userService from "../../services/userService";

import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { AuthedUserContext } from "../../App";

const MyFriends = () => {
  const currentUser = useContext(AuthedUserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllFriends();
  }, []);
  const fetchAllFriends = async () => {
    const allUsers = await userService.showUsers();
    const allFriends = allUsers.find(
      (user) => user.username === currentUser.username
    ).friends;
    setUsers(allFriends || []);
  };

  const UserListItems = (
    <List sx={{ mb: 2 }}>
      {users
        .filter((user) => user.username !== currentUser.username)
        .map((user) => (
          <Fragment key={user._id}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{user.username.substring(0, 1).toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={`Joined on ${user.createdAt}`}
              />
            </ListItemButton>
          </Fragment>
        ))}
    </List>
  );
  return <>{UserListItems}</>;
};

export default MyFriends;
