import * as React from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { UserForm } from "@pages/shared/user-form/user-form";

export const Account = () => {
  return (
    <Box paddingY={2}>
      <Box marginBottom={1}>
        <Typography variant="h4">Akun</Typography>
      </Box>
      <Divider />
      <Grid container>
        <Grid  item sm={4}>
          <UserForm />
        </Grid>
      </Grid>
    </Box>
  );
};
