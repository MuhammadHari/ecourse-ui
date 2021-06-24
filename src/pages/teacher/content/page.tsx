import * as React from "react";
import { TeacherContentProvider } from "@providers/teacher-content-provider";
import { ContentList } from "./content-list";
import { Box, Grid } from "@material-ui/core";
import { useHeight } from "@hooks/use-height";
import { ContentViewer } from "./content-viewer";

const TeacherContent = () => {
  const height = useHeight();
  return (
    <Grid container>
      <Grid lg={3} item md={4}>
        <div style={{ height }}>
          <ContentList />
        </div>
      </Grid>
      <Grid item lg={9} md={8}>
        <Box style={{ height, overflowY: "auto", overflowX: "hidden" }}>
          {!height ? null : <ContentViewer />}
        </Box>
      </Grid>
    </Grid>
  );
};

export const Page = () => {
  return (
    <TeacherContentProvider>
      <TeacherContent />
    </TeacherContentProvider>
  );
};
