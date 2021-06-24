import * as React from "react";
import { ContentModelType } from "@root/models";
import {
  Box,
} from "@material-ui/core";
import { ContentViewSwitcher } from "@pages/shared/classroom/content/media-player";
import { DiscussionWrapper } from "@components/discussion/discussion-wrapper";
import { ContentViewerHeader } from './content-viewer.header'

export const ContentViewer = ({ content }: { content: ContentModelType }) => {
  return (
    <>
      <ContentViewerHeader content={content} />
      <Box marginBottom={2}>
        <ContentViewSwitcher selected={content} />
      </Box>
      <DiscussionWrapper content={content} />
    </>
  );
};
