import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GoogleButton from "../Buttons/GoogleButton";
import {LoginInfo, LoginResponse} from  "../../types/types";
import { getUser } from "../../api";
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
    setLoginInfo({email: "", password: "", message: ""});
  };

  const [loginInfo, setLoginInfo] = React.useState({email: "", password: "", message: ""});

  const attemptLogin = async (login:LoginInfo) => { 
    const response:LoginResponse = await getUser(login) as LoginResponse;
    return response;
  }

  const handleLogin = () => {
    const {email, password} = loginInfo;
    const resp = attemptLogin({email, password}).then((response:LoginResponse) => {
      if (response.emailExists && !response.correctPassword) {
        setLoginInfo({...loginInfo, message: "Incorrect Password"});
      } else if (!response.emailExists) {
        setLoginInfo({...loginInfo, message: "An account with that email address does not exist"});
      }else {
        setLoginInfo({email: "", password: "", message: "Success!"});
      }
  }
    ).catch((error:Error) => console.log("in clientside LogIn component", error));
  
  }
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
       onChange =  {(e) => setLoginInfo({...loginInfo, email:e.target.value})}
      />

      <TextField
        // autoFocus
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        onChange = {(e) => setLoginInfo({...loginInfo, password:e.target.value})}
      />

    </DialogContent>

    <DialogActions className={classes.login}>
      
        <Button
          className={classes.login}
          onClick={handleLogin}
          variant="contained"
        >
          Login
        </Button>
        {(loginInfo.message.length > 0 ) ? <Typography color = 'red'>{loginInfo.message}</Typography> : <></> }
        <Typography variant='h5' m ={2}> OR </Typography>

        <GoogleButton onClick={handleClose} />
    </DialogActions>
  </Dialog>
</>
  );
}
