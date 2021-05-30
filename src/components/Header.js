import React from "react";

import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96rem",
  },
  name: {
    textAlign: "left",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Samuel's Grocery Shop
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
