import * as React from "react";
import {
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useClasses as useNavigatorStyles } from "@root/layout/styles";
import { useApp } from "@providers/app-provider/provider";
import clsx from "clsx";
import { Home as HomeIcon } from "@material-ui/icons";
import { SidebarList } from "@root/layout/side-bar-list";
import { AccountNavigator } from "@root/layout/account-navigator";
import { useGetItems } from "./utils";
import { observer } from "mobx-react";

export const Navigator = observer((props: DrawerProps) => {
  const classes = useNavigatorStyles();
  const { user } = useApp();
  const navs = useGetItems();
  return (
    <Drawer variant="permanent" {...props}>
      <List component="nav" disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          ECOURSE
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              secondary: classes.secondary,
            }}
            secondary={user?.email}
            style={{ fontWeight: "bolder" }}
          >
            {user?.name}
          </ListItemText>
        </ListItem>
        <SidebarList items={navs} />
        <AccountNavigator />
      </List>
    </Drawer>
  );
});
