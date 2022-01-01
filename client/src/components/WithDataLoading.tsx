import {
  Box,
  createStyles,
  LinearProgress,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      height: "100%",
    },
  };
});

function WithDataLoading(Component: any) {
  const classes = useStyles();
  return function WihLoadingComponent({
    isLoading,
    ...props
  }: {
    [x: string]: any;
    isLoading: boolean;
  }) {
    if (!isLoading) return <Component className={classes.root} {...props} />;
    return (
      <Box>
        <Typography
          style={{ color: "white", textAlign: "center", fontSize: "30px" }}
        >
          Hold on, fetching data may take some time :)
        </Typography>
        <LinearProgress />
      </Box>
    );
  };
}
export default WithDataLoading;
