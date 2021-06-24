import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useDiscussionPaginator } from "./provider";
import { service } from "@services/discussion";
import { observer } from "mobx-react";
import { DiscussionFormProps, DiscussionForm } from "./discussion-form";
import { useToggle } from "@hooks/use-toggle";

const useUpdate = service.update;

export const Editor = observer(() => {
  const { selected, mode, updateSelected } = useDiscussionPaginator();

  const isOpen = Boolean(selected && mode === "edit");

  const [disableClose, { inline: onLoading }] = useToggle();

  const onClose = () => {
    if (selected && !disableClose) {
      updateSelected(selected, "view");
    }
  };
  const getInitial = () =>
    !selected
      ? {}
      : {
          content: selected.content,
          title: selected.title,
        };
  const config: DiscussionFormProps = {
    onSuccess: onClose,
    message: "Perubahan berhasil di simpan",
    injectInput: {
      id: selected ? selected.id : "",
    },
    onLoading,
    utils: useUpdate,
    withTitle: true,
    initialValues: getInitial(),
  };

  return (
    <Dialog keepMounted={false} fullWidth onClose={onClose} open={isOpen}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        {selected ? <DiscussionForm {...config} /> : null}
      </DialogContent>
    </Dialog>
  );
});
