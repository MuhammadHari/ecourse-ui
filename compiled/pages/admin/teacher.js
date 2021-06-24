import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserDataTable, UserDataTableProvider } from "./shared/user-data-table";
import { RootStoreBaseQueries } from "@root-model";
import { Box, Grid, Typography } from "@material-ui/core";
import { UserForm } from "./shared/user-form";
import { userService } from "@services/user";
import { observer } from "mobx-react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { usePaginatorContext } from "@hooks/use-paginator";
import { useLayout } from "@providers/layout-provider/provider";
const useCreate = userService.teacher.create;
const CreateStudentForm = observer(() => {
    const { provider: Provider, loading, handler, result, form, } = useCreate({
        injectInput: {
            role: "Teacher",
        },
        inputParser({ password_confirmation: _, ...rest }) {
            return rest;
        },
    });
    const { go } = usePaginatorContext();
    useSuccessModal({
        callback() {
            form.reset({});
            go(1);
        },
        depedencies: Boolean(result),
        message: "Pengajar berhasil di tambah",
    });
    return (_jsx(Provider, { children: _jsx(UserForm, { disableGrade: true, loading: loading, handler: handler }, void 0) }, void 0));
});
export const Component = () => {
    const { getContentHeight } = useLayout();
    return (_jsx(UserDataTableProvider, Object.assign({ query: RootStoreBaseQueries.queryTeachers }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 12, md: 8, lg: 6 }, { children: _jsx(UserDataTable, { height: getContentHeight() }, void 0) }), void 0),
                _jsx(Grid, Object.assign({ item: true, sm: 12, md: 4, lg: 6 }, { children: _jsxs(Box, Object.assign({ paddingX: 2 }, { children: [_jsx(Typography, Object.assign({ variant: "h4" }, { children: "Tambah Pengajar" }), void 0),
                            _jsx(Box, Object.assign({ padding: 2 }, { children: _jsx(CreateStudentForm, {}, void 0) }), void 0)] }), void 0) }), void 0)] }), void 0) }), void 0));
};
