import * as React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { DiscussionReplyModelType } from "@root/models";
import { useApp } from "@providers/app-provider/provider";
import { ArrowBack, Edit } from "@material-ui/icons";
import { useToggle } from "@hooks/use-toggle";
import { service } from "@services/discussion";
import { DiscussionForm, DiscussionFormProps } from "../discussion-form";
import { useIsOwner } from "@hooks/use-is-owner";

type Props = {
  model: DiscussionReplyModelType;
};
const useUpdate = service.replyUpdate;

type EditProps = {
  onSuccess(): void;
  model: DiscussionReplyModelType;
  onLoading(v: boolean): void;
};

const EditForm = ({ onSuccess, model, onLoading }: EditProps) => {
  const config: DiscussionFormProps = {
    onSuccess,
    onLoading,
    injectInput: {
      id: model.id,
    },
    message: "Perubahan berhasil di simpan",
    utils: useUpdate,
    initialValues: {
      content: model.content,
    },
  };
  return <DiscussionForm disableToolbar {...config} />;
};

export const Chatbox = ({ model }: Props) => {
  const app = useApp();
  const isSameUser = () => app && app.user && app.user.id === model.user.id;
  const getName = () => {
    if (isSameUser()) {
      return "Anda";
    }
    return model.user.name;
  };
  const theme = useTheme();
  const [isEditMode, { toggle, force }] = useToggle();
  const [hasLoading, { inline }] = useToggle();
  const isOwner = useIsOwner({ model, modelKey: "user.id" });
  return (
    <Box display="flex">
      <Box marginRight={2}>
        <Avatar src={model.user.name} />
      </Box>
      <Box flex={1}>
        <Typography
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {getName()}
          {!isOwner ? null : (
            <IconButton disabled={hasLoading} onClick={toggle} size="small">
              {isEditMode ? <ArrowBack /> : <Edit />}
            </IconButton>
          )}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {model.hummanize}
        </Typography>
        <Box
          padding={1}
          bgcolor="#eaeff1"
          borderRadius={theme.shape.borderRadius}
        >
          {isEditMode ? (
            <EditForm
              onSuccess={force(false)}
              model={model}
              onLoading={inline}
            />
          ) : (
            <DraftJsViewer data={model.content as string} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
