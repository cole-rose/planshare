import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import background from "./img/grand_canyon.jpeg";
import Navbar from "./components/Navbar/Navbar";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      height: "100vh",
      overflow: "auto",
    },
  };
});

function App() {
  useEffect(() => {
    document.title = "planshare";
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.root}>
      <Navbar />
    </Container>
  );
}

export default App;
