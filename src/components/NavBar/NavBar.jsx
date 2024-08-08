import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import {
  Box,
  Link as MuiLink,
  Stack,
  IconButton,
  Divider,
  AppBar,
  Typography,
  Toolbar,
} from "@mui/material";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Box>
            {user ? (
              <Stack
                justifyContent="space-between"
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <MuiLink
                  sx={{ textAlign: "center" }}
                  id="mui-link"
                  component={Link}
                  to="/posts"
                >
                  <IconButton color="white">
                    <Diversity1Icon color="white" />
                  </IconButton>
                </MuiLink>

                <MuiLink id="mui-link" component={Link} to="/my-posts">
                  <Typography variant="h6"> My posts</Typography>
                </MuiLink>

                <MuiLink component={Link} to="/users" sx={{ color: "white" }}>
                  <Typography variant="h6">Users</Typography>
                </MuiLink>
                <MuiLink id="mui-link" component={Link} to="/myfriendsrequest">
                  <Typography variant="h6">My Friends Request</Typography>
                </MuiLink>
                <MuiLink id="mui-link" component={Link} to="/myfriends">
                  <Typography variant="h6"> My Friends</Typography>
                </MuiLink>

                <Typography variant="h6">{user.username}</Typography>

                <MuiLink
                  id="mui-link"
                  component={Link}
                  to=""
                  onClick={handleSignout}
                >
                  <Typography variant="h6"> Sign out</Typography>
                </MuiLink>
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <MuiLink
                  sx={{ textAlign: "center" }}
                  id="mui-link"
                  component={Link}
                  to="/"
                >
                  <IconButton color="white">
                    <Diversity1Icon color="white" />
                  </IconButton>
                </MuiLink>

                <MuiLink id="mui-link" component={Link} to="/signin">
                  <Typography variant="h6"> Sign In</Typography>
                </MuiLink>
                <MuiLink id="mui-link" component={Link} to="/signup">
                  <Typography variant="h6"> Sign Up</Typography>
                </MuiLink>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
