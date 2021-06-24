import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { WrapSectionProvider, useSectionProvider, } from "@service-provider/section-provider";
import { observer } from "mobx-react";
import { useClassroomManagement } from "@providers/classroom-management";
import { FormField } from "@fields/form-field";
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@material-ui/core";
import { useSuccessModal } from "@hooks/use-success-modal";
import { Role } from "@root/models";
import { Edit, Save } from "@material-ui/icons";
import { useApp } from "@providers/app-provider/provider";
import { useLayout } from "@providers/layout-provider/provider";
const Form = ({ handler, loading }) => {
    return (_jsxs("form", Object.assign({ onSubmit: handler }, { children: [_jsx(Box, Object.assign({ marginY: 3 }, { children: _jsx(FormField, { disabled: loading, variant: "outlined", fullWidth: true, name: "title", label: "Nama mata pelajaran" }, void 0) }), void 0),
            _jsx(Button, Object.assign({ startIcon: loading ? _jsx(CircularProgress, { size: 15 }, void 0) : _jsx(Save, {}, void 0), disabled: loading, color: "primary", variant: "outlined", type: "submit" }, { children: "Simpan" }), void 0)] }), void 0));
};
const CreateSectionForm = observer(() => {
    const { model: classroom } = useClassroomManagement();
    const { create, refresh } = useSectionProvider();
    const { provider: Provider, handler, result, form, loading, } = create({
        injectInput: {
            classroomId: classroom.id,
        },
    });
    useSuccessModal({
        callback() {
            form.setValue("title", "");
            refresh();
        },
        message: "Mata pelajaran berhasil di tambah",
        depedencies: Boolean(result),
    });
    return (_jsx(Provider, { children: _jsx(Form, { loading: loading, handler: handler }, void 0) }, void 0));
});
const EditDialog = observer(({ selected, onSuccess, }) => {
    const { update } = useSectionProvider();
    const { provider: Provider, form, result, handler, loading, } = update({
        injectInput: {
            id: selected ? selected.id : null,
        },
    });
    useSuccessModal({
        callback() {
            form.setValue("title", "");
            onSuccess();
        },
        message: "Mata pelajaran berhasil di edit",
        depedencies: Boolean(result),
    });
    useEffect(() => {
        if (selected) {
            form.setValue("title", selected.title);
        }
    }, [selected]);
    const handleClose = () => {
        if (!loading) {
            onSuccess();
        }
    };
    return (_jsxs(Dialog, Object.assign({ onClose: handleClose, fullWidth: true, open: Boolean(selected) }, { children: [_jsx(DialogTitle, { children: "Edit nama mata pelajaran" }, void 0),
            _jsx(DialogContent, { children: _jsx(Provider, { children: _jsx(Form, { loading: loading, handler: handler }, void 0) }, void 0) }, void 0)] }), void 0));
});
const SectionTable = ({ onRowClick, }) => {
    const { getContentHeight } = useLayout();
    const { sections } = useSectionProvider();
    return (_jsx(Box, Object.assign({ bgcolor: "white" }, { children: _jsx(TableContainer, Object.assign({ style: { height: getContentHeight() } }, { children: _jsxs(Table, Object.assign({ stickyHeader: true }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Mata pelajaran" }, void 0),
                                _jsx(TableCell, { children: "Jumlah konten" }, void 0)] }, void 0) }, void 0),
                    _jsx(TableBody, { children: sections.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs(Box, Object.assign({ component: "span" }, { children: [_jsx(IconButton, Object.assign({ onClick: () => onRowClick(item), size: "small", style: { marginRight: 3 }, component: "span" }, { children: _jsx(Edit, {}, void 0) }), void 0),
                                            _jsx(Typography, Object.assign({ component: "span" }, { children: item.title }), void 0)] }), void 0) }, void 0),
                                _jsx(TableCell, Object.assign({ align: "right" }, { children: item.contentCount }), void 0)] }, item.id))) }, void 0)] }), void 0) }), void 0) }), void 0));
};
const Component = observer(() => {
    const [selected, setSelected] = useState(null);
    const { user } = useApp();
    const isEnableWrite = () => {
        return user?.role === Role.Adm;
    };
    return (_jsxs(_Fragment, { children: [_jsx(EditDialog, { onSuccess: () => setSelected(null), selected: selected }, void 0),
            _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, md: 6, sm: 12, lg: 5 }, { children: _jsx(SectionTable, { onRowClick: setSelected }, void 0) }), void 0),
                    isEnableWrite() ? (_jsx(Grid, Object.assign({ item: true, md: 6, sm: 12, lg: 7 }, { children: _jsx(Box, Object.assign({ paddingX: 2 }, { children: _jsxs(Box, Object.assign({ padding: 2 }, { children: [_jsx(Typography, Object.assign({ variant: "h6" }, { children: "Tambah mata pelajaran" }), void 0),
                                    _jsx(CreateSectionForm, {}, void 0)] }), void 0) }), void 0) }), void 0)) : null] }), void 0)] }, void 0));
});
export const Section = WrapSectionProvider(Component);
