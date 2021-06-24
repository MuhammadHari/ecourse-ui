import * as React from "react";
import { observer } from "mobx-react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { ContentList } from "./item-switcher";
import { Provider, useContentList } from "./provider";
import { MediaPlayer } from "./media-player";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { AnimatePresence, motion } from "framer-motion";
import { ContentHeader } from "./content-header";
import { ContentProvider, useContentProvider } from "./content-provider";
import { DiscussionViewer } from "@components/discussion";
import { useHeight } from "@hooks/use-height";
import { AppLoader } from "@components/app-loader";
import { useClassroomManagement } from "@providers/classroom-management";

const Description = () => {
  const { content: selected } = useContentProvider();
  if (!selected) {
    return null;
  }
  return <DraftJsViewer data={selected.description as string} />;
};

const FadeAnimation = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export const ContentView = () => {
  const { mode, content } = useContentProvider();
  return (
    <>
      <ContentHeader />
      <AnimatePresence>
        {mode === "discussion" ? (
          <FadeAnimation>
            <DiscussionViewer content={content} />
          </FadeAnimation>
        ) : (
          <>
            <MediaPlayer />
            <Box padding={2} bgcolor="white">
              <Typography style={{ fontWeight: "bold" }}>Deskripsi</Typography>
              <hr />
              <Description />
            </Box>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ViewMode = observer(() => {
  const height = useHeight(2);
  const { loading } = useContentList();
  return (
    <FadeAnimation>
      {loading ? <AppLoader /> : null}
      <div style={{ height, overflow: "hidden" }}>
        <Grid container>
          <Grid item sm={12} md={2} lg={3}>
            <ContentList />
          </Grid>
          <Grid item sm={12} md={10} lg={9}>
            <Box style={{ height }} overflow="auto">
              <ContentProvider>
                <ContentView />
              </ContentProvider>
            </Box>
          </Grid>
        </Grid>
      </div>
    </FadeAnimation>
  );
});

export const Content = observer(
  ({ method = "classroom" }: { method?: "user" | "classroom" }) => {
    return (
      <Provider method={method}>
        <AnimatePresence>
          <ViewMode />
        </AnimatePresence>
      </Provider>
    );
  }
);
