import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import axios from "axios";
import "../components/input/input.css";
import PrimarySearchAppBar from "../components/navbar/Navbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, SetuserName] = useState("");
  const [password, Setpassword] = useState("");
  const [token, setToken] = useState("");

  if (token.length) {
    localStorage.setItem("token", token);
  }

  const signUp = () => {
    const newUser = {
      username,
      password,
    };

    const Jsonuser = JSON.stringify(newUser);
    console.log(Jsonuser);
    axios
      .post("/auth/users/", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const submit = () => {
    // e.preventDefault();
    const newUser = {
      username,
      password,
    };

    const Jsonuser = JSON.stringify(newUser);
    console.log(Jsonuser);
    axios
      .post("/token/login/",newUser)
      .then((res) => setToken(res.data))
      .catch((err) => console.log(err));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="login_page">
      <PrimarySearchAppBar />

      <div className="form_box">
        <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"text"}
            onChange={(e) => SetuserName(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end"></IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => Setpassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button onClick={() => signUp()} variant="contained">
          Sign up
        </Button>
        <Button onClick={() => submit()} variant="contained" type="button">
          login
        </Button>
      </div>
      <div className="form_box"></div>
    </div>
  );
};

export default Login;
