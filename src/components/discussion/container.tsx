import * as React from "react";
import { DiscussionModelType } from "@root/models";
import {
  Avatar,
  Badge,
  Box,
  makeStyles,
  Paper,
  Typography,
  Collapse,
  Divider,
  Button,
} from "@material-ui/core";
import { ChatBubble } from "@material-ui/icons";
import { ReplyContainer } from "./reply-container";
import { observer } from "mobx-react";
import { useIsOwner } from "@hooks/use-is-owner";

type Props = {
  item: DiscussionModelType;
  onClick(): void;
  onEditClick(): void;
  selected: boolean;
};

const useClasses = makeStyles(() => ({
  root: {},
  title: {
    fontWeight: "bold",
  },
}));

const Info = ({
  model,
  onClick,
}: {
  onClick(): void;
  model: DiscussionModelType;
}) => {
  const classes = useClasses();
  const item = model;
  return (
    <Box
      onClick={onClick}
      alignItems="center"
      display="flex"
      padding={1}
      style={{ cursor: "pointer" }}
    >
      <Box marginRight={2}>
        <Avatar src={item.user.name} />
      </Box>
      <Box flex={1}>
        <Typography className={classes.title}>{item.title}</Typography>
        <Typography variant="caption" color="textSecondary">
          Di posting oleh: {item.user.name}, {item.hummanize}
        </Typography>
      </Box>
      <Box paddingRight={2}>
        <Badge badgeContent={item.replyCount} color="primary">
          <ChatBubble />
        </Badge>
      </Box>
    </Box>
  );
};

export const Container = observer(
  ({ item, onClick, selected, onEditClick }: Props) => {
    const isOwner = useIsOwner({ model: item });
    return (
      <Paper>
        <Info model={item} onClick={onClick} />
        <Collapse unmountOnExit mountOnEnter timeout="auto" in={selected}>
          <Divider style={{ backgroundColor: "#eaeff1" }} />
          {!isOwner ? null : <Button onClick={onEditClick}>Edit</Button>}
          <Divider style={{ backgroundColor: "#eaeff1" }} />
          <ReplyContainer model={item} />
        </Collapse>
      </Paper>
    );
  }
);
