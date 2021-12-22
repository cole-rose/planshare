import { countReset } from "console";
import React from "react";
import { AppBar, Container , Toolbar, Typography} from "@material-ui/core";
function App() {
  return (
  <Container className="App">
    <AppBar>
      <Toolbar> 
        <Typography variant="h4">
          planshare
        </Typography>
      </Toolbar>
  </AppBar>
</Container>);
}

export default App;
