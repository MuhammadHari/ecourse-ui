import * as React from "react";
import { useLayout } from "@providers/layout-provider/provider";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Help as HelpIcon, Menu } from "@material-ui/icons";
import { useAppClasses } from "./styles";
import { observer } from "mobx-react";

export const Header = observer(({ onDrawerToggle }: any) => {
  const classes = useAppClasses();
  const { pageTitle, appbarRef } = useLayout();
  const theme = useTheme();
  const isIsm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      ref={appbarRef}
      className={classes.secondaryBar}
      color="primary"
      position="sticky"
    >
      <div style={{ height: 48 }}>
        <Grid
          container
          style={{ paddingLeft: 8, paddingRight: 8 }}
          alignItems="center"
          spacing={1}
        >
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
            }}
            item
            xs
          >
            {isIsm ? (
              <IconButton onClick={onDrawerToggle}>
                <Menu style={{ color: "white" }} />
              </IconButton>
            ) : null}
            <Typography
              color="inherit"
              style={{
                fontWeight: "bolder",
              }}
            >
              {pageTitle}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Help">
              <IconButton color="inherit">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </AppBar>
  );
});
