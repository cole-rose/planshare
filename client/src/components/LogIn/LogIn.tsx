import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GoogleButton from "../Buttons/GoogleButton";

const useStyles = makeStyles(() => {
  return {
    root: {

      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00",
      },
      color:'#ffffff',
      "&.MuiDialogContentText-root": {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      },
    },
    siteName: {
      color: "#f57c00",
      "&.MuiDialogTitle-root" : {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",

      }
    },
    login: {
        "&.MuiButton-contained": {
          color: "#fffff",
          background: "#f57c00",
            },
        "&.MuiDialogActions-spacing": {
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          
            }
        },
  };
});

export default function LogIn() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
      <>
    <Button
      className={classes.root}
      variant="contained"
      onClick={handleClickOpen}
    >
      Log In
    </Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle className={classes.siteName}><Typography variant = 'h5'>planshare</Typography></DialogTitle>
    <DialogContent>
      {/* <Box display='flex' alignItems='center' justifyContent='center' flexDirection='row'> */}
      {/* <DialogContentText className={classes.root}>
        <Typography variant='h4'>Login</Typography>

      </DialogContentText> */}

      <TextField
        // autoFocus
        margin="dense"
        id="name"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
      />

      <TextField
        // autoFocus
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
      />

    </DialogContent>

    <DialogActions className={classes.login}>
      
        <Button
          className={classes.login}
          onClick={handleClose}
          variant="contained"
        >
          Login
        </Button>
        <Typography variant='h5' m ={2}> OR </Typography>

        <GoogleButton onClick={handleClose} />
    </DialogActions>
  </Dialog>
</>
  );
}
