import * as React from "react";
import {
  UserDataTableProvider,
  UserDataTable,
} from "../../admin/shared/user-data-table";
import { RootStoreBaseQueries } from "@root-model";
import { Grade, Role } from "@root/models";
import { observer } from "mobx-react";
import { Box, Grid, Typography } from "@material-ui/core";
import { CreateStudentForm } from "@pages/admin/student";
import { useApp } from "@providers/app-provider/provider";
import { useClassroomManagement } from "@providers/classroom-management";
import {useLayout} from "@providers/layout-provider/provider";

export const Student = observer(() => {
  const { model: classroom } = useClassroomManagement();
  const { user } = useApp();
  const isEnableWrite = () => {
    return user?.role === Role.Adm;
  };
  const { getContentHeight } = useLayout();
  return (
    <UserDataTableProvider
      query={RootStoreBaseQueries.queryStudents}
      grade={classroom.grade as Grade}
    >
      <Grid container>
        <Grid item sm={12} md={8} lg={6}>
          <UserDataTable height={getContentHeight()} hideGrade />
        </Grid>
        {isEnableWrite() ? (
          <Grid item sm={12} md={4} lg={6}>
            <Box paddingX={2}>
              <Typography variant="h4">Tambah Siswa</Typography>
              <Box padding={2}>
                <CreateStudentForm grade={classroom.grade as Grade} />
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </UserDataTableProvider>
  );
});
