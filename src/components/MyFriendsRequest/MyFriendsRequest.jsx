import { useState, useEffect, useContext, Fragment } from "react";
import * as userService from "../../services/userService";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { AuthedUserContext } from "../../App";

const MyFriendsRequest = () => {
  const currentUser = useContext(AuthedUserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllFriendsRequest();
  }, []);
  const fetchAllFriendsRequest = async () => {
    const allUsers = await userService.showUsers();
    const allFriendsRequest = allUsers.find(
      (user) => user.username === currentUser.username
    ).friendsRequests;
    setUsers(allFriendsRequest || []);
  };

  const handleAddFriend = (userId) => {
    userService.acceptFriendRequest(userId);
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
              <IconButton
                onClick={() => {
                  handleAddFriend(user._id);
                }}
                sx={{ ml: 1, mt: 1.5 }}
              >
                <AddTaskIcon fontSize="large" color="primary" />
              </IconButton>
            </ListItemButton>
          </Fragment>
        ))}
    </List>
  );
  return (
    <>
      {users.length === 0
        ? "You Don't Have any friends request"
        : UserListItems}
    </>
  );
};

export default MyFriendsRequest;
