import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import  {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {LoginInfo, LoginResponse} from  "../../types/types";
import { getUser } from "../../api";
import { getGoogleUser } from '../../api/index';

const client_id:string = "134885380905-rg1ju8dvpp2u7m27fctud9is2hgh1h7v.apps.googleusercontent.com";

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [loginFailed, setLoginFailed] = React.useState<boolean>(false);
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

  const handleGoogleLogin = async (googleData:any ) => {
    if( googleData.tokenId) {
      const res = await getGoogleUser(googleData.tokenId);
    console.log(res);}
    else{
      setLoginInfo({...loginInfo, message: "Google Login Failed! Please try again."});
    }


  }
  console.log('db:', process.env.DATABASE_ACCESS);
  console.log(process.env);
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
{/* 
        <GoogleButton onClick={handleClose} /> */}
       
        <GoogleLogin
    clientId={client_id}
    buttonText="Log in with Google"
    onSuccess={handleGoogleLogin}
    onFailure={(response: any) => {setLoginInfo({...loginInfo, message: "Google Login Failed! Please try again."})}}
    cookiePolicy={'single_host_origin'}
    prompt='consent'
/>
    </DialogActions>
  </Dialog>
</>
  );
}
