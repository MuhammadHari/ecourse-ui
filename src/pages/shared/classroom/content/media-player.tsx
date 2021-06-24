import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import { Player } from "@components/player";
import { useToggle } from "@hooks/use-toggle";
import { ContentModelType } from "@root/models";
import { PdfViewer } from "@components/pdf-viewer";
import { useContentProvider } from "@pages/shared/classroom/content/content-provider";

const VideoPlayer = ({ url }: { url: string }) => {
  const [play, { force }] = useToggle();
  return <Player url={url} onContainerClick={force(true)} play={play} />;
};

export const ContentViewSwitcher = ({
  selected,
}: {
  selected: ContentModelType;
}) => {
  const isPdf = selected.type === "PDF";
  const media = selected.mediaContent as string;
  const Node = isPdf ? PdfViewer : VideoPlayer;
  return <Node url={media} />;
};

export const MediaPlayer = () => {
  const { content: selected } = useContentProvider();
  return (
    <Box bgcolor="white">
      {!selected ? (
        <Typography variant="h3" align="center">
          Pilih salah satu konten
        </Typography>
      ) : (
        <ContentViewSwitcher selected={selected} />
      )}
    </Box>
  );
};
