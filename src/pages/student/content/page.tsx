import * as React from "react";
import { StudentPageLayout } from "@root/layout/user/student-page-layout";
import { ContentViewer } from "./content-viewer";
import { ContentSwitcher } from "./content-switcher";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";
import { useStudentContentProgress } from "@providers/student-app/use-student-content";
import { ContentModelType, SectionModelType } from "@root/models";
import { observer } from "mobx-react";
import { useNavigateToContent } from "@pages/student/shared/content-list-item";

const useContentSwitcher = (
  content: ContentModelType,
  section: SectionModelType
) => {
  const items = section.contents;
  const currentIndex = items.findIndex((i) => i.id === content.id);
  const navigate = useNavigateToContent();
  const prev = () => {
    if (currentIndex === -1) return;
    return navigate(items[currentIndex - 1])();
  };
  const next = () => {
    if (currentIndex === items.length - 1) return;
    return navigate(items[currentIndex + 1])();
  };
  return { next, prev, currentIndex, itemlen: items.length - 1 };
};

const Header = ({
  section,
  content,
}: {
  section: SectionModelType;
  content: ContentModelType;
}) => {
  const { back } = useNavigate();
  const { next, prev, currentIndex, itemlen } = useContentSwitcher(
    content,
    section
  );
  return (
    <Box flex={1} alignItems="center" display="flex">
      <IconButton onClick={back} style={{ marginRight: "1rem" }}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ fontWeight: "bolder", flex: 1 }}
      >
        {section.title}
      </Typography>
      <ButtonGroup size="small" variant="contained" color="primary">
        <Button disabled={currentIndex === 0} onClick={prev}>
          Sebelumnya
        </Button>
        <Button disabled={currentIndex === itemlen} onClick={next}>
          Selanjutnya
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export const Page = observer(() => {
  const { content, section } = useStudentContentProgress();
  if (!section || !content) {
    return <></>;
  }
  return (
    <StudentPageLayout
      navigator={<ContentSwitcher section={section} />}
      content={<ContentViewer content={content} />}
      header={<Header content={content} section={section} />}
    />
  );
});
