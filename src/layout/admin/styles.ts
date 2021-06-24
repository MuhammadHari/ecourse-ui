import { makeStyles } from "@material-ui/core";

const lightColor = "rgba(255, 255, 255, 0.7)";

export const useAppClasses = makeStyles((theme) => ({
  secondaryBar: {},
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
}));
export const drawerWidth = 256;

export const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    position : "relative",
    height: "100vh",
    overflow:"hidden"
  },
  main: {
    flex: 1,
    background: "#eaeff1",
    overflow: "auto",
    height: "100vh"
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
}));
