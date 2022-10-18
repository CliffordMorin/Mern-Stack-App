import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import GoogleIcon from "./googleIcon";
import useStyles from "./styles";
import Input from "./Input";
import InputEmail from "./InputEmail";

import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";
import { useDispatch } from "react-redux";

//form data's initial state
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const CLIENT_ID =
  "336536776294-qvt1nfm9go2g4v2lvkugc33k03p8rbb8.apps.googleusercontent.com";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [emailError, setEmailError] = useState({ mode: "", message: "" });
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignedUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  const handleChangeEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailError({
        mode: "error",
        message: "Not a valid email",
      });
      console.log("Not a valid email");
    } else {
      setEmailError({ mode: "", message: "" });
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log("Valid email");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevIsSignedUp) => !prevIsSignedUp);
  };
  const switchMode = () => {
    setIsSignedUp((prevSwitchSign) => !prevSwitchSign);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (res) => {
    console.log("Google Sign In was unsuccessful", res);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <InputEmail
              name="email"
              label="Email Address"
              handleChangeEmail={handleChangeEmail}
              type="email"
              error={emailError.mode}
              helperText={emailError.message}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignedUp && (
              <Input
                name="confirmedPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={CLIENT_ID}
            render={(renderProps) => (
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={renderProps.onClick}
                disable={renderProps.disabled}
                startIcon={<GoogleIcon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
