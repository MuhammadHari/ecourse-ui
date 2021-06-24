import * as React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useClasses } from "./styles";
import { Settings, ExitToApp } from "@material-ui/icons";
import { useLogout } from "@providers/app-provider/logout-provider";
import {useNavigate} from "@hooks/use-navigate";

export const AccountNavigator = () => {
  const classes = useClasses();
  const { openDialog } = useLogout();
  const { navigateHandler } = useNavigate();
  return (
    <>
      <ListItem className={classes.itemHeader}>
        <ListItemText
          classes={{ primary: classes.categoryHeaderPrimary }}
          primary="Account"
        />
      </ListItem>
      <List component="div">
        <ListItem button onClick={navigateHandler('/account-setting')} className={classes.item}>
          <ListItemIcon className={classes.itemIcon}>
            <Settings />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.itemPrimary }}
            primary="Setting"
          />
        </ListItem>
        <ListItem onClick={openDialog} button className={classes.item}>
          <ListItemIcon className={classes.itemIcon}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.itemPrimary }}
            primary="Logout"
          />
        </ListItem>
      </List>
      <Divider />
    </>
  );
};
