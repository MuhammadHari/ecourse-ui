import * as React from "react";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import { useStudentSection } from "@providers/student-app/use-student-section";
import { observer } from "mobx-react";
import { useNavigate } from "@hooks/use-navigate";

export const Progress = observer(() => {
  const { sections } = useStudentSection();
  const { navigateHandler } = useNavigate();

  return (
    <Box paddingY={2}>
      <Box marginBottom={1}>
        <Typography variant="h4">Progress anda</Typography>
      </Box>
      <Divider />
      <Box padding={1} marginTop={2}>
        {sections.map((item) => {
          return (
            <Box paddingBottom={2} key={item.id}>
              <Paper>
                <Box padding={2}>
                  <Box alignItems="center" display="flex">
                    <Typography style={{ flex: 1 }}>{item.title}</Typography>
                    <Button
                      onClick={navigateHandler("/section/:id", { id: item.id })}
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      Tampilkan mata pelajaran
                    </Button>
                  </Box>
                  <Box alignItems="center" paddingY={1} display="flex">
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      style={{ flex: 1, marginRight: "1rem" }}
                    />
                    <Typography variant="caption">{item.progress} %</Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});
