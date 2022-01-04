import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import CreateAccount from "../CreateAccount/CreateAccount";
import { makeStyles } from "@mui/styles";
import React from "react";
import LogIn from "../LogIn/LogIn";

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00",
      },
      "&.MuiToolbar-gutters": {
        backgroundColor: "#ffffff",
      },
      "&.MuiPaper-root-MuiAppBar-root": {
        backgroundColor: "#ffffff",
      },
    },
    createAccountButton: {
      "&.MuiButton-contained": {
        color: "#000000",
        background: "#bdbdbd",
      },
    },
    siteName: {
      color: "#f57c00",
    },
  };
});

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.root}>
        <Typography variant="h6" className={classes.siteName}>
          planshare
        </Typography>
        <Box
          display="flex"
          flexGrow={1}
          flexDirection="row"
          justifyContent="flex-end"
        >
          <Box padding={1}>
            <LogIn />
          </Box>
          <Box padding={1}>
            <CreateAccount />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
