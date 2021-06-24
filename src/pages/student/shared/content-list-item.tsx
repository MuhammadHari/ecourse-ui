import * as React from "react";
import { ContentModelType } from "@root/models";
import { useNavigate } from "@hooks/use-navigate";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { observer } from "mobx-react";

type Props = {
  selected: boolean;
  onClick(): void;
  model: ContentModelType;
  avatar?: boolean;
};

export function useNavigateToContent() {
  const { navigateHandler } = useNavigate();
  return (model: Props["model"]) => {
    return navigateHandler("/content/:sectionId/:contentId", {
      sectionId: model.sectionId,
      contentId: model.id,
    });
  };
}

export const ContentListItem = observer(
  ({ model: item, selected, onClick, avatar }: Props) => {
    const isComplete = item.progress.completed;
    const theme = useTheme();
    return (
      <ListItem onClick={onClick} selected={selected} button key={item.id}>
        {avatar ? (
          <ListItemAvatar>
            <Avatar src={item.thumbnail} />
          </ListItemAvatar>
        ) : null}
        <ListItemText secondary={item.title} />
        {isComplete ? (
          <ListItemIcon>
            <CheckCircle style={{ color: theme.palette.success.main }} />
          </ListItemIcon>
        ) : null}
      </ListItem>
    );
  }
);
