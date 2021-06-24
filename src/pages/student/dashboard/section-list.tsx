import * as React from "react";
import {SectionModelType} from "@root/models";
import {take} from "lodash";
import {useNavigate} from "@hooks/use-navigate";
import {ContentListItem, useNavigateToContent} from "@pages/student/shared/content-list-item";
import {Box, Button, Divider, Grid, List, Paper, Typography} from "@material-ui/core";
import {useStudentSection} from "@providers/student-app/use-student-section";


const SectionInfo = ({ model }: { model: SectionModelType }) => {
  const items = take(model.contents, 5);
  const { navigateHandler } = useNavigate();
  const onClick = useNavigateToContent();
  return (
    <Box marginBottom={1} padding={2}>
      <Paper>
        <Box padding={1} alignItems="center" display="flex">
          <Typography
            color="textSecondary"
            style={{ fontWeight: "bolder", flex: 1 }}
          >
            {model.title}
          </Typography>
          <Button
            onClick={navigateHandler("/section/:id", { id: model.id })}
            variant="contained"
            color="primary"
            size="small"
          >
            Tampilkan semua ({model.contentCount})
          </Button>
        </Box>
        <Divider />
        <List dense>
          {items.map((item) => (
            <ContentListItem
              selected={false}
              avatar
              onClick={onClick(item)}
              model={item}
              key={item.id}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};


export const SectionList = () => {
  const { sections } = useStudentSection();
  return (
    <Box paddingY={2}>
      <Box marginBottom={1}>
        <Typography variant="h4">Mata pelajaran</Typography>
      </Box>
      <Divider />
      <Grid container>
        {sections.map((item) => {
          return (
            <Grid sm={6} item key={item.id}>
              <SectionInfo model={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
