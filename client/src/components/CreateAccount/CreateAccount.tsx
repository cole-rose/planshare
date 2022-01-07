import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { Box, LinearProgress, Typography } from "@mui/material";
import GoogleButton from "../Buttons/GoogleButton";
import { GoogleLogin } from "react-google-login";
import { User } from "../../types/types";
import { createNewUser } from "../../api/index";
import { validateEmail } from '../../utils/utils';

const client_id: string =
  "134885380905-rg1ju8dvpp2u7m27fctud9is2hgh1h7v.apps.googleusercontent.com";

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiButton-contained": {
        color: "#000000",
        background: "#bdbdbd",
      },
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
    createAccount: {
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
export default function CreateAccount() {
  const [open, setOpen] = React.useState(false);
  const [wrongInputMessage, setWrongInputMessage] = React.useState<String[]>(
    []
  );

  const [inputValidation, setInputValidation] = React.useState<{
    [prop: string]: string;
  }>({
    email: "",
    password: "",
    passwords: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    confirmedPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUser({
      email: "",
      password: "",
      confirmedPassword: "",
      firstName: "",
      lastName: "",
    });
    setWrongInputMessage([]);
    setInputValidation({
      email: "",
      password: "",
      passwords: "",
      firstName: "",
      lastName: "",
    });
  };

  const created = async (user: User) => {
    const message = await createNewUser(user);
    return message.notDuplicateUser;
  };
  

  const handleGoogleSignUp = () => {};
  const handleCreateAccount = () => {
    if (!loading) {
      setLoading(true);
      setWrongInputMessage([]);
      
    }
    const passwordsMatch: boolean = (user.password === user.confirmedPassword);
    const validEmail: boolean = validateEmail(user.email);
    const validFirstName: Boolean = user.firstName.length > 0;
    const validLastName: Boolean = user.lastName.length > 0;
    var message: String[] = [];
    const passwordExists:boolean = user.password.length > 0;
    if (!passwordExists) {
      setInputValidation((preValidation) => ({...preValidation, password: "You must enter a password", passwords: "You must enter a password"}));
      
    }else {
      setInputValidation((preValidation) => ({...preValidation, password: ""}));
      setInputValidation((preValidation) => ({...preValidation, passwords: ""}));
    }
    if (!validFirstName) {
      setInputValidation((preValidation) => ({...preValidation, firstName: "You must enter a first name"}));
    } else {
      setInputValidation((preValidation) => ({...preValidation, firstName: ""}));
    }
    if (!validLastName) {
      setInputValidation((preValidation) => ({...preValidation, lastName: "You must enter a last name"}));
    }else {
      setInputValidation((preValidation) => ({...preValidation, lastName: ""}));
    }

    if (!validEmail) {
      setInputValidation((preValidation) => ({...preValidation, email:"You must enter a valid email" }));
    }else {
      setInputValidation((preValidation) => ({...preValidation, email: ""}));
    }

    if (passwordExists){
      if (!passwordsMatch) {
        setInputValidation((preValidation) => ({...preValidation, passwords:"Passwords do not match" }));
      }else {
        setInputValidation((preValidation) => ({...preValidation, passwords:"" }));
      }
    }
    if (passwordsMatch && validFirstName && validLastName && validEmail && passwordExists) {
      const newUser: User = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        friends: [] as string[],
        createdPlans: [] as string[],
        invitedPlans: [] as string[],
      };

      created(newUser)
        .then((created: Boolean) => {
          if (created) {
            setUser({
              email: "",
              password: "",
              confirmedPassword: "",
              firstName: "",
              lastName: "",
            });
            message.push("Success");
            setWrongInputMessage(message);
          } else {
            message.push("An account with that email address already exists");
            setWrongInputMessage(message);
          }
        })
        .then(() => setLoading(false))
        .catch((error: Error) =>
          console.log("in CreateAccount component", error)
        );
      // setOpen(false);
    } else {
      setLoading(false);
    }
  };
  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.root}
        variant="contained"
        onClick={handleClickOpen}
      >
        Create Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {loading ? <LinearProgress color="secondary" /> : null}
        <DialogTitle className={classes.siteName}>
          <Typography variant="h5">planshare </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display='flex' alignItems='center' justifyContent='center' flexDirection='row'>
          <DialogContentText className={classes.root}>
            <Typography variant="h4">Welcome to planshare</Typography>
          </DialogContentText>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Box display="flex" paddingRight={2}>
              <TextField
        
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                variant="standard"
                value={user.firstName}
                required
                error = {inputValidation.firstName.length > 0 }
                helperText = {inputValidation.firstName}
                onChange={(e) => {
                  setUser((prevUser) => ({ ...prevUser,firstName: e.target.value }));
                }}
              />
            </Box>
            <Box>
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"

              variant="standard"
              value ={user.lastName}
              required
              error = {inputValidation.lastName.length > 0}
              helperText = {inputValidation.lastName}
              onChange={(e) => {
                setUser((prevUser) =>  ({ ...prevUser, lastName: e.target.value }));
              }}
            />
          </Box>
          </Box>
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            
            variant="standard"
            value  = {user.email}
            error = {inputValidation.email.length > 0}
            helperText = {inputValidation.email}
            onChange={(e) => {
              setUser( (prevUser) => ({ ...prevUser, email: e.target.value }));
            }}
            required
          />

          <TextField
            margin="dense"
            id="password"
            label="Create a Password"
            type="password"
            fullWidth
            variant="standard"
            required
            error = {inputValidation.password.length > 0}
            helperText = {inputValidation.password}
            value = {user.password}
            onChange={(e) => {
              setUser((prevUser) => ({ ...prevUser, password: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            required
            value={user.confirmedPassword}
            error = {inputValidation.passwords.length > 0}
            helperText = {inputValidation.passwords}
            onChange={(e) => {
              setUser((prevUser) => ({ ...prevUser, confirmedPassword: e.target.value }));
            }}
          />
        </DialogContent>
        {wrongInputMessage.length > 0 ? <Box m= {2}> {wrongInputMessage.map((e: String) => (
          <Typography align='center' color="error">{e}</Typography>))}</Box>
       :null}
        <DialogActions className={classes.createAccount}>
          <Button
            className={classes.createAccount}
            onClick={handleCreateAccount}
            variant="contained"
          >
            Create Account
          </Button>
          
          <Typography variant="h5" m={2}>
            {" "}
            OR{" "}
          </Typography>
          <GoogleLogin
            clientId={client_id}
            buttonText="Continue with Google"
            onSuccess={handleGoogleSignUp}
            onFailure={handleGoogleSignUp}
            cookiePolicy={"single_host_origin"}
            prompt="consent"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
