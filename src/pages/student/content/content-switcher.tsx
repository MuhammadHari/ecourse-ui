import * as React from "react";
import { Box, List } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { SectionModelType } from "@root/models";
import {
  ContentListItem,
  useNavigateToContent,
} from "@pages/student/shared/content-list-item";

export const ContentSwitcher = observer(
  ({ section }: { section: SectionModelType }) => {
    const { contentId } = useParams<any>();
    const onClick = useNavigateToContent();
    if (!section) {
      return <></>;
    }
    return (
      <Box padding={1}>
        <List dense style={{ padding: 0 }}>
          {section.contents.map((item) => (
            <ContentListItem
              onClick={onClick(item)}
              selected={contentId === item.id}
              model={item}
              key={item.id}
            />
          ))}
        </List>
      </Box>
    );
  }
);
