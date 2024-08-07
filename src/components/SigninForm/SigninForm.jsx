import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { Box, TextField, Button } from "@mui/material";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <Box
      mt={8}
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      alignItems={"center"}
      gap={1}
    >
      <h1>Log In</h1>
      <p>{message}</p>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          onChange={handleChange}
          id="name"
          value={formData.username}
          name="username"
          sx={{ backgroundColor: "white", mb: 1 }}
          fullWidth
          autoComplete="off"
        />

        <TextField
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
          autoComplete="off"
          sx={{ backgroundColor: "white", mb: 1 }}
          fullWidth
        />

        <Box display="flex" justifyContent="space-between" flexGrow={1}>
          <Link to="/">
            <Button color="error" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disableElevation
            variant="contained"
            // disabled={isFormInvalid()}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SigninForm;
