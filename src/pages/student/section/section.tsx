import * as React from "react";
import { StudentPageLayout } from "@root/layout/user/student-page-layout";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import { ArrowBack, PlayArrow } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useFetchSection } from "@providers/student-app/student-section-provider";
import { ContentModelType, SectionModelType } from "@root/models";
import { useNavigate } from "@hooks/use-navigate";

const Navigator = ({ model }: { model: SectionModelType }) => {
  return (
    <div>
    </div>
  );
};

const ContentCard = ({ model }: { model: ContentModelType }) => {
  const p = model.progress.completion;

  const { navigateHandler } = useNavigate();

  return (
    <Paper variant="outlined">
      {p ? <LinearProgress variant="determinate" value={p} /> : null}
      <Box padding={1} display="flex" alignItems="center">
        <Typography style={{ flex: 1 }} color="textSecondary">
          {model.title}
        </Typography>
        <Button
          onClick={navigateHandler("/content/:sectionId/:contentId", {
            contentId: model.id,
            sectionId: model.sectionId,
          })}
          color="primary"
          variant="contained"
          size="small"
          startIcon={<PlayArrow />}
        >
          Mulai belajar
        </Button>
      </Box>
    </Paper>
  );
};

const Content = ({ model }: { model: SectionModelType }) => {
  const contents = model.contents ?? [];

  return (
    <div>
      <Grid container>
        {contents.map((item) => (
          <Grid key={item.id} item sm={6}>
            <Box padding={1}>
              <ContentCard model={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Header = () => {
  const { back } = useNavigate();
  return (
    <Box flex={1} alignItems="center" display="flex">
      <IconButton onClick={back} style={{ marginRight: "1rem" }}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ fontWeight: "bolder" }}
      >
        Mata pelajaran
      </Typography>
    </Box>
  );
};

export const Section = observer(() => {
  const section = useFetchSection();

  if (!section) {
    return <></>;
  }
  return (
    <StudentPageLayout
      header={<Header />}
      content={<Content model={section} />}
    />
  );
});
