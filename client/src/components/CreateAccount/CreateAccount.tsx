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
    const passwordsMatch: Boolean = user.password === user.confirmedPassword;
    const validEmail: Boolean = user.email !== "";
    const validFirstName: Boolean = user.firstName !== "";
    const validLastName: Boolean = user.lastName !== "";
    var message: String[] = [];
    if (!validFirstName) {
      message.push("Must enter a first name");
    }
    if (!validLastName) {
      message.push(`Must enter a last name`);
    }

    if (!validEmail) {
      message.push(`Must enter a valid email`);
    }
    if (!passwordsMatch) {
      message.push(`Passwords do not match`);
      setWrongInputMessage(message);
    }
    if (passwordsMatch && validFirstName && validLastName && validEmail) {
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
            setWrongInputMessage(["GREAT SUCCESS"]);
            // handleClose();
          } else {
            message.push("An account with that email address already exists");
            setWrongInputMessage(message);
          }
        }).then(() => setLoading(false))
        .catch((error: Error) =>
          console.log("in CreateAccount component", error)
        );
      // setUser({...user, firstName: "", lastName: "", email: "", password:"", confirmedPassword: ""})
      // setOpen(false);
    } else{
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
      {loading? <LinearProgress color='secondary'/> : null} 
        <DialogTitle className={classes.siteName}>
          <Typography variant="h5">planshare </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Box display='flex' alignItems='center' justifyContent='center' flexDirection='row'> */}
          <DialogContentText className={classes.root}>
            <Typography variant="h4">Welcome to planshare</Typography>
          </DialogContentText>
          {/* </Box> */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Box display="flex" paddingRight={2}>
              <TextField
                // autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="name"
                variant="standard"
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
              />
            </Box>
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="name"
              variant="standard"
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />
          </Box>
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />

          <TextField
            margin="dense"
            id="password"
            label="Create a Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUser({ ...user, confirmedPassword: e.target.value });
            }}
          />
        </DialogContent>
        {wrongInputMessage.map((e: String) => (
          <Typography color="error">{e}</Typography>
        ))}
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
