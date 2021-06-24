import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: (theme.zIndex.drawer + 1) * 1000,
      color: "#fff",
      display: "flex",
      alignItems: "center",
    },
  })
);

export const AppLoader = () => {
  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open>
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography align="center" color="inherit">
            Loading
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};
