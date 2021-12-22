import React from "react";
import { AppBar, Box, Button, Container , Theme, Toolbar, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import background from './img/grand_canyon.jpeg'
// const useStyles = makeStyles((theme: Theme) => {
//   return {
//     root: {
//       height: "100vh",
//       background: theme.palette.background.default,
//       flexGrow: 1,
//       overflow:"scroll"
//     },
//     siteName: {
//       color: theme.palette.primary.main
//     },
//     logInButton: {
//       color: theme.palette.primary.main
//     },
   

//   };
// });
const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display:'flex',
      height: '100vh',
      overflow:'hidden',
      flexGrow:1
    },
    appBar: {

      "&.MuiButton-contained": {
        color: "#fffff",
        background: "#f57c00"
      },
      // '&.MuiAppBar': {
      //   colorPrimary: "#ffffff",
      //   backgroundColor: "#ffffff"
      // },
      "&.MuiToolbar-gutters": {
        backgroundColor: "#ffffff"
      },
      "&.MuiPaper-root-MuiAppBar-root": {
        backgroundColor: "#ffffff"
      }
      
    },
    createAccountButton: {
      "&.MuiButton-contained": {
        color: "#000000",
        background: "#bdbdbd"
      }},
    siteName: {
      color: "#f57c00"
    }, 

  }});

function App() {

  const classes = useStyles();
  return (

  <Container maxWidth={false} className={classes.root}>
    <AppBar className = {classes.appBar}>
      <Toolbar className = {classes.appBar}> 
        <Typography variant="h6" className={classes.siteName}>
          planshare
        </Typography>
        <Box     display='flex'  flexGrow={4} flexDirection='row' justifyContent='flex-end' >
        <Box padding={1}>
        <Button   className={classes.appBar}  variant= 'contained' >Log In</Button>
        </Box>
        <Box padding={1}>
        <Button className={classes.createAccountButton}  variant='contained' >Create Account</Button>
        </Box>
        </Box>
      </Toolbar>
  </AppBar>
</Container>
);
}

export default App;
