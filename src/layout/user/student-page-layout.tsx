import * as React from "react";
import { Box, Divider, Grid } from "@material-ui/core";

type Props = {
  header?: React.ReactNode;
  navigator?: React.ReactNode;
  content: React.ReactNode;
};

export const StudentPageLayout = ({ header, navigator, content }: Props) => {
  return (
    <>
      {header ? (
        <Box marginBottom={1}>
          <Box height={48} display="flex" alignItems="center">
            {header}
          </Box>
          <Divider />
        </Box>
      ) : null}
      <Grid container>
        {navigator ? (
          <Grid sm={3} item>
            {navigator}
          </Grid>
        ) : null}
        <Grid sm={navigator ? 9 : 12} item>
          {content}
        </Grid>
      </Grid>
    </>
  );
};
