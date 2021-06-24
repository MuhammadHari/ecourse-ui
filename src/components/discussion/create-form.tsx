import * as React from "react";
import { ContentModelType, DiscussionModelType } from "@root/models";
import { service } from "@services/discussion";
import { useDiscussionPaginator } from "./provider";
import { Box, Button, Collapse, Paper } from "@material-ui/core";
import { useToggle } from "@hooks/use-toggle";
import { DiscussionForm, DiscussionFormProps } from "./discussion-form";

const useCreate = service.create;

type Props = {
  content: ContentModelType;
};

export const CreateForm = ({ content }: Props) => {
  const { refresh } = useDiscussionPaginator();
  const [open, { inline, toggle }] = useToggle();
  const config: DiscussionFormProps<DiscussionModelType> = {
    withTitle: true,
    onSuccess() {
      refresh();
      inline(false);
    },
    injectInput: {
      contentId: content.id,
    },
    message: "Diskusi anda berhasil di tambahkan",
    utils: useCreate,
  };
  return (
    <>
      <Box textAlign="right">
        <Button
          onClick={toggle}
          color={open ? "secondary" : "primary"}
          variant="contained"
        >
          {!open ? "Tambah thread diskusi" : "Tutup"}
        </Button>
      </Box>
      <Box marginY={2}>
        <Paper>
          <Collapse unmountOnExit mountOnEnter in={open}>
            <Box padding={2}>
              <DiscussionForm {...config} />
            </Box>
          </Collapse>
        </Paper>
      </Box>
    </>
  );
};
