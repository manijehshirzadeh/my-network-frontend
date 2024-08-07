import { useState, useEffect, useContext, Fragment } from "react";
import * as userService from "../../services/userService";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { AuthedUserContext } from "../../App";

const UsersList = () => {
  const currentUser = useContext(AuthedUserContext);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    const allUsers = await userService.showUsers();
    setUsers(allUsers || []);
  };

  const currentUserInfo = users.find((user) => user._id === currentUser._id);
  const currentUserFriends = currentUserInfo ? currentUserInfo.friends : [];

  const handleAddFriend = (userId) => {
    userService.addFriend(userId);
    fetchAllUsers();
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
              {!currentUserFriends.some(
                (friend) => friend._id === user._id
              ) && (
                <IconButton sx={{ ml: 1, mt: 1.5 }}>
                  <PersonAddAltIcon
                    fontSize="large"
                    color="primary"
                    onClick={() => {
                      handleAddFriend(user._id);
                    }}
                  />
                </IconButton>
              )}
            </ListItemButton>
          </Fragment>
        ))}
    </List>
  );
  return <>{UserListItems}</>;
};

export default UsersList;
