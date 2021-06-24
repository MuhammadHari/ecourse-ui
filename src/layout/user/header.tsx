import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useApp } from "@providers/app-provider/provider";
import { useNavigate } from "@hooks/use-navigate";
import { observer } from "mobx-react";
import { ExitToApp, PowerOff } from "@material-ui/icons";
import { useLogout } from "@providers/app-provider/logout-provider";

const useClasses = makeStyles((theme) => ({
  appbar: {
    height: 48,
    display: "flex",
    justifyContent: "center",
    background: "white",
  },
  header: {
    paddingTop: 48,
    display: "flex",
    alignItems: "center",
    height: 48 * 2,
    background: theme.palette.primary.main,
    color: "white",
  },
}));

export const Header = observer(() => {
  const app = useApp();
  const classes = useClasses();
  const { navigateHandler } = useNavigate();
  const { openDialog } = useLogout();
  return (
    <>
      <AppBar className={classes.appbar}>
        <Container>
          <Box display="flex" alignItems="center">
            <Box flex={1}>
              <Button onClick={navigateHandler("/dashboard")}>
                Ruang kelas
              </Button>
            </Box>
            <Button onClick={openDialog} startIcon={<ExitToApp />}>
              Keluar
            </Button>
          </Box>
        </Container>
      </AppBar>
      <div className={classes.header}>
        <Container>
          <Box display="flex" alignItems="center">
            <Box flex={1}>
              <Typography variant="h4">{app.user?.name}</Typography>
              <Typography color="textSecondary">
                {app.user?.email} | {app.user?.gradeLabel}
              </Typography>
            </Box>
            <Box>
              <Avatar
                component={Paper}
                elevation={3}
                style={{ width: 50, height: 50 }}
                alt={app.user?.name}
                src={app.user?.avatar ?? ""}
              />
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
});
