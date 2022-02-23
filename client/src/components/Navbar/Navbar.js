import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import instaverse from "../../images/instaverse.png";

const Navbar = () => {
  const classes = useStyles();
  //get the user by grabbing the user from local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    //when someone logs out push them to /auth
    navigate("/auth");
    //if someone is logged out set the user to null
    setUser(null);
  };
  //need to re navigate automatically to log in
  useEffect(() => {
    const token = user?.token;

    //handling for when JWT expires
    //run logout function if token decodedToken is greater than the current time in miliseconds
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    //set user to profile from local storage, when the page loads
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          {" "}
          mindump{" "}
        </Typography>
        <img
          className={classes.image}
          src={instaverse}
          alt="instaverse"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {/* if there is a user return there avatar and info, and if no user return a sign in button*/}
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={logout}
              color="secondary"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
