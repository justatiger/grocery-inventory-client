import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96rem",
  },
  name: {
    textAlign: "left",
  },
}));

const Header = (userInfo) => {
  console.log(userInfo.userInfo);
  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    console.log("Ok");
    dispatch(logout());
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {userInfo.userInfo && (
            <Typography variant="h6" className={classes.name}>
              {`Hello, ${userInfo.userInfo.firstName} ${userInfo.userInfo.lastName}`}
            </Typography>
          )}
          <Typography variant="h6" className={classes.title}>
            Samuel's Grocery Shop
          </Typography>
          {userInfo.userInfo && (
            <Button
              variant="contained"
              style={{ textAlign: "right" }}
              onClick={logoutHandler}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
