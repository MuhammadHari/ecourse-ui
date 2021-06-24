import * as React from "react";
import { useReply, Provider } from "./provider";
import { Box, Divider, Typography } from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { Chatbox } from "./chatbox";
import { DiscussionModelType } from "@root/models";
import { LoadingButton } from "@components/loading-button";
import { ArrowDropDown } from "@material-ui/icons";
import { CreateForm } from "./create-form";

const ChatBoxContainer = () => {
  const { data, loading, next, nextDisabled } = useReply();
  return (
    <Box padding={2}>
      {data.map((item) => (
        <Box key={item.id} marginBottom={2}>
          <Chatbox model={item} />
        </Box>
      ))}
      <LoadingButton
        fullWidth
        onClick={next}
        loading={loading}
        disabled={Boolean(nextDisabled)}
        icon={<ArrowDropDown />}
      >
        Lihat lebih
      </LoadingButton>
    </Box>
  );
};

export const Content = ({
  model: selected,
}: {
  model: DiscussionModelType;
}) => {
  return (
    <Provider model={selected}>
      <Box paddingX={2}>
        <DraftJsViewer data={selected.content as string} />
      </Box>
      <Divider style={{ backgroundColor: "#eaeff1" }} />
      <CreateForm parent={selected} />
      <Divider style={{ backgroundColor: "#eaeff1" }} />
      <ChatBoxContainer />
    </Provider>
  );
};
