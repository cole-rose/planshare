import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { LoginInfo, LoginResponse } from "../../types/types";
import { getUser } from "../../api";
import { getGoogleUser } from "../../api/index";
import { validateEmail } from '../../utils/utils';
const client_id: string =
  "134885380905-rg1ju8dvpp2u7m27fctud9is2hgh1h7v.apps.googleusercontent.com";

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00",
      },
      color: "#ffffff",
      "&.MuiDialogContentText-root": {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      },
    },
    siteName: {
      color: "#f57c00",
      "&.MuiDialogTitle-root": {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      },
    },
    login: {
      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00",
      },
      "&.MuiDialogActions-spacing": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
    },
  };
});

export default function LogIn() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loginFailed, setLoginFailed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValidation, setInputValidation] = React.useState<{ [prop: string]: string}>({email:"", password:""});

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginInfo({ email: "", password: "", message: "" });
    setInputValidation({email:"", password:""});
    setLoading(false);
  };

  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
    message: "",
  });


  const attemptLogin = async (login: LoginInfo) => {
    const response: LoginResponse = (await getUser(login)) as LoginResponse;
    return response;
  };



  const handleLogin = () => {

    const { email, password } = loginInfo;
    
    const validEmail:boolean = validateEmail(email);
    const passwordFilled:boolean = password.length > 0;
    if (validEmail) {
      setInputValidation((preValidation) => ({...preValidation, email: ""}));
    }else {
      setInputValidation((preValidation) => ({...preValidation, email: "You must enter a valid email to login"}));
    }

    if (passwordFilled) {
      setInputValidation((preValidation) => ({...preValidation, password: ""}));
    }else {
      setInputValidation((preValidation) => ({...preValidation, password: "You must enter a password to login"}));
    }
    if (validEmail && passwordFilled) {
      if (!loading) {
        setLoading(true);
        setLoginInfo({
          ...loginInfo,
          message: "",
        });
      }
    const resp = attemptLogin({ email, password })
      .then((response: LoginResponse) => {
        if (response.emailExists && !response.correctPassword) {
          setLoginInfo({
            ...loginInfo,
            message: "Incorrect Password",
          });
  
            
       
        } else if (!response.emailExists) {
          setLoginInfo({
            ...loginInfo,
            message: "An account with that email address does not exist",
          });
  
     
        } else {
   
            setLoginInfo({
              ...loginInfo,
              message: "Success"});

     
        }
      }).then(() => setLoading(false))
      .catch((error: Error) => {
        console.log("in clientside LogIn component", error);
        }
      );
      } else{
        setLoading(false);
      }

  };

  const handleGoogleLogin = async (googleData: any) => {
    setInputValidation({email:"", password:""});
    setLoginInfo((prevInfo) => ({...prevInfo, message: ""}));
    if (!loading) {
      setLoading(true);

    }
    if (googleData.tokenId) {
      const res = await getGoogleUser(googleData.tokenId).
       then(() => setLoading(false)).
      catch((error:Error) => {
        console.log('in Login.tsx: ', error);
      });
    } else {
      setGoogleLoginFailMessage();
      setLoading(false);
    
    }
   
  };


  const setGoogleLoginFailMessage = () => {
            
    setLoginInfo((prevLoginInfo) =>
    ({...prevLoginInfo,
    message: "Google Login Failed! Please try again.",
  }));}


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
      {loading? <LinearProgress color='secondary'/> : null} 
        <DialogTitle className={classes.siteName}>
          <Typography variant="h5">planshare</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField

            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value = {loginInfo.email}
            error = {inputValidation.email.length > 0}
            helperText = {inputValidation.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />

          <TextField
          
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value = {loginInfo.password}
            error = {inputValidation.password.length > 0}
            helperText = {inputValidation.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
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
          {loginInfo.message.length > 0 ? (
            
            <Typography m={1} align = 'center' color="error">{loginInfo.message}</Typography>
          ) : (
            null
          )}
          <Typography variant="h5" m={2}>
            {" "}
            OR{" "}
          </Typography>

          <GoogleLogin
            clientId={client_id}
            buttonText="Log in with Google"
            onSuccess={handleGoogleLogin}
            onFailure={(response: any) => {
            
              setGoogleLoginFailMessage();
            }}
            cookiePolicy={"single_host_origin"}
            prompt="consent"
          />
        </DialogActions>
    
      </Dialog>
    </>
  );
}
