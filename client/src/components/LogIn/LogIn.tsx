import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import GoogleButton from "../Buttons/GoogleButton";

const useStyles = makeStyles(() => {
  return {
    root: {
      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00",
      },
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

      }},
    createAccount: {
      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00",
      },
      "&.MuiDialogActions-spacing": {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        
      },
   
    }
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
        LogIn
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.siteName}><Typography variant = 'h5'>planshare </Typography></DialogTitle>
        <DialogContent>
          {/* <Box display='flex' alignItems='center' justifyContent='center' flexDirection='row'> */}
          <DialogContentText className={classes.root}>
            <Typography variant='h4'>Welcome to planshare</Typography>
  
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
              />
            </Box>
            <TextField
          
              margin="dense"
              id="lastName"
              label="Last Name"
              type="name"
              variant="standard"
            />
          </Box>
          <TextField
         
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
       
            margin="dense"
            id="password"
            label="Create a Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
         
            margin="dense"
            id="password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions className={classes.createAccount}>
          
            <Button
              className={classes.createAccount}
              onClick={handleClose}
              variant="contained"
            >
              Create Account
            </Button>
            <Typography variant='h5' m ={2}> OR </Typography>

            <GoogleButton onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </>
  );
}
