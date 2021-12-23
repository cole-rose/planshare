import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles(() => {
    return {
      root: {
  
        "&.MuiButton-contained": {
          color: "#fffff",
          background: "#f57c00"
        },
      },
      siteName: {
        color: "#f57c00"
      }, 
  
    }});
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
    <div>
      <Button className={classes.root}  variant= 'contained' onClick={handleClickOpen}>
        LogIn
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className = {classes.siteName}>planshare</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to planshare
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="name"
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="name"
        
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        
        <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
          />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


