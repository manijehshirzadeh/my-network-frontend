import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { Box, Button, TextField } from "@mui/material";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
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
      <h1>Sign Up</h1>
      <p>{message}</p>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          onChange={handleChange}
          id="name"
          value={username}
          name="username"
          sx={{ backgroundColor: "white", mb: 1 }}
          fullWidth
        />

        <TextField
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
          autoComplete="off"
          sx={{ backgroundColor: "white", mb: 1 }}
          fullWidth
        />

        <TextField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="off"
          sx={{ backgroundColor: "white", mb: 1 }}
          fullWidth
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
        />

        <Box display="flex" justifyContent="space-between" flexGrow={1}>
          <Link to="/">
            <Button color="error" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button
            disableElevation
            variant="contained"
            disabled={isFormInvalid()}
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupForm;
