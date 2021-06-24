import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserDataTableProvider, UserDataTable, } from "../../admin/shared/user-data-table";
import { RootStoreBaseQueries } from "@root-model";
import { Role } from "@root/models";
import { observer } from "mobx-react";
import { Box, Grid, Typography } from "@material-ui/core";
import { CreateStudentForm } from "@pages/admin/student";
import { useApp } from "@providers/app-provider/provider";
import { useClassroomManagement } from "@providers/classroom-management";
import { useLayout } from "@providers/layout-provider/provider";
export const Student = observer(() => {
    const { model: classroom } = useClassroomManagement();
    const { user } = useApp();
    const isEnableWrite = () => {
        return user?.role === Role.Adm;
    };
    const { getContentHeight } = useLayout();
    return (_jsx(UserDataTableProvider, Object.assign({ query: RootStoreBaseQueries.queryStudents, grade: classroom.grade }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 12, md: 8, lg: 6 }, { children: _jsx(UserDataTable, { height: getContentHeight(), hideGrade: true }, void 0) }), void 0),
                isEnableWrite() ? (_jsx(Grid, Object.assign({ item: true, sm: 12, md: 4, lg: 6 }, { children: _jsxs(Box, Object.assign({ paddingX: 2 }, { children: [_jsx(Typography, Object.assign({ variant: "h4" }, { children: "Tambah Siswa" }), void 0),
                            _jsx(Box, Object.assign({ padding: 2 }, { children: _jsx(CreateStudentForm, { grade: classroom.grade }, void 0) }), void 0)] }), void 0) }), void 0)) : null] }), void 0) }), void 0));
});
