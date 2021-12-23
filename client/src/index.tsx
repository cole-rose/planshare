import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
declare var module:any;
if (module.hot) {
  module.hot.accept();
}


var theme = createTheme({ 
  // components: {
  //   MuiPaper:
  //   {
  //     styleOverrides: {
  //       colorPrimary: "ffffff"
  //     }
  //   }
  // },
  
  palette: {
    // primary: {main:   },
    // secondary: {main:"#ffffff"   },
    // background: {
    //   default: 'white'
    // },

  }

});
theme = responsiveFontSizes(theme);
ReactDOM.render(

      <ThemeProvider theme = {theme}>
    <App />
    </ThemeProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
