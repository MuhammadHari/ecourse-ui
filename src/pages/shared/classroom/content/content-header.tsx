import * as React from "react";
import { useContentList } from "./provider";
import {
  AppBar,
  Box,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useContentProvider } from "./content-provider";

const useClasses = makeStyles(() => ({
  root: {},
  title: {
    fontWeight: "bolder",
    flex: 1,
  },
  subtitle: {},
}));

export const ContentHeader = () => {
  const classes = useClasses();
  const { changeMode, mode, content: selected } = useContentProvider();
  if (!selected) return null;
  return (
    <AppBar variant="outlined" position="static" className={classes.root}>
      <Toolbar style={{ alignItems: "flex-end" }}>
        <Box flex="1" paddingY={1}>
          <Typography className={classes.title}>{selected.title}</Typography>
          {selected?.user ? (
            <Typography>{selected?.user.name} </Typography>
          ) : null}
        </Box>
        <Tabs value={mode} onChange={(e: any, v: any) => changeMode(v)}>
          <Tab value="view" label="Konten" />
          <Tab value="discussion" label="Diskusi" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};
