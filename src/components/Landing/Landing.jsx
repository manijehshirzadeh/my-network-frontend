import { Box, Typography } from "@mui/material";

const Landing = () => {
  return (
    <Box mt={8}>
      <Typography sx={{ color: "#01579b" }} variant="h2">
        Welcome to My Network
      </Typography>

      <Typography variant="h5">
        My Network is a platform for connecting with colleagues, friends, and
        new contacts. Easily stay updated with an engaging feed, showcase your
        skills, make your friendship. Join My Network today and enhance your
        networking experience!
      </Typography>
    </Box>
  );
};

export default Landing;
