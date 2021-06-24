import * as React from "react";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

const useClasses = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const GuestLayout = ({ children }: any) => {
  const classes = useClasses();
  return <div className={classes.root}>{children}</div>;
};
