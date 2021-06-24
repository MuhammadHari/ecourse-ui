import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import { service } from "@services/discussion";
import { DiscussionModelType } from "@root/models";
import { observer } from "mobx-react";
import { useReply } from "./provider";
import { DiscussionForm, DiscussionFormProps } from "../discussion-form";
import { useCallback } from "react";

const useCreate = service.replyCreate;

export const CreateForm = observer(
  ({ parent }: { parent: DiscussionModelType }) => {
    const { refresh } = useReply();
    const getConfig = useCallback((): DiscussionFormProps => {
      return {
        message: "Pesan anda berhasil di tambahkan",
        utils: useCreate,
        injectInput: {
          discussionId: parent.id,
        },
        onSuccess() {
          refresh();
          parent.localeUpdateCount();
        },
      };
    }, [parent]);

    return (
      <Box paddingX={2} paddingY={1}>
        <Typography>Tambahkan balasan :</Typography>
        <DiscussionForm {...getConfig()} />
      </Box>
    );
  }
);
