import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import { AccountBox, Book, Timeline } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";
import {useParams} from "react-router-dom";

const items = [
  { keyname: "courses", label: "Mata pelajaran", icon: Book },
  { keyname: "progress", label: "Progress", icon: Timeline },
  { keyname: "account", label: "Akun saya", icon: AccountBox },
];

export const Controller = () => {
  const theme = useTheme();
  const { navigateHandler } = useNavigate();
  const { tab } = useParams<any>()
  return (
    <Box padding={2}>
      <List style={{ padding: 0 }}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              selected={tab === item.keyname}
              onClick={navigateHandler("/dashboard/:tab", {
                tab: item.keyname,
              })}
              key={item.keyname}
              button
            >
              <ListItemIcon>
                <Icon style={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText secondary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
