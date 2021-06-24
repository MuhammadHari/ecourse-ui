import * as React from "react";
import {
  Box,
  CssBaseline,
  Hidden,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { Header } from "./header";
import { Navigator } from "./navigator";
import { useClasses, drawerWidth, useAppClasses } from "./styles";
import { useLayout } from "@providers/layout-provider/provider";
import { useHeight } from "@hooks/use-height";

const useAppContainerStyle = makeStyles(() => ({
  root: {
    overflowY: "auto",
  },
}));

const AppContainer = ({ children }: any) => {
  const classes = useClasses();
  const appClasses = useAppContainerStyle();
  const height = useHeight();
  return (
    <main className={classes.main}>
      <div
        style={{
          height,
        }}
        className={appClasses.root}
      >
        {children}
      </div>
    </main>
  );
};

export const AdminLayout = ({ children }: any) => {
  const classes = useClasses();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <AppContainer>{children}</AppContainer>
        </div>
      </div>
    </>
  );
};
