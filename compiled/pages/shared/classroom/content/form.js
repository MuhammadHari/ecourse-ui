import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, CircularProgress, Collapse, Grid, Typography, } from "@material-ui/core";
import { FileUploadProvider, useFileUpload, } from "@components/form-fields/file-upload-field";
import { Player } from "@components/player";
import { PdfViewer } from "@components/pdf-viewer";
import { useToggle } from "@hooks/use-toggle";
import { FormField } from "@fields/form-field";
import { SectionField } from "@fields/section-field";
import { TextEditor } from "@fields/text-editor-field";
import { Save } from "@material-ui/icons";
import { useLayout } from "@providers/layout-provider/provider";
import { useHeight } from "@hooks/use-height";
import { useState } from "react";
const Field = ({ disabled }) => {
    const { clickHandler } = useFileUpload();
    return (_jsx(Button, Object.assign({ fullWidth: true, disabled: disabled, variant: "contained", color: "primary", onClick: clickHandler }, { children: "Pilih file" }), void 0));
};
const VideoMode = ({ url }) => {
    const [play, { toggle }] = useToggle();
    return _jsx(Player, { url: url, onContainerClick: toggle, play: play }, void 0);
};
const FileWatcher = () => {
    const { previewUrl, type } = useFileUpload();
    const { getContentHeight } = useLayout();
    if (!previewUrl) {
        return _jsx(_Fragment, {}, void 0);
    }
    if (type.includes("video")) {
        return _jsx(VideoMode, { url: previewUrl }, void 0);
    }
    if (type.includes("pdf")) {
        return (_jsx(Box, { children: _jsx(PdfViewer, { url: previewUrl }, void 0) }, void 0));
    }
    return _jsx(_Fragment, {}, void 0);
};
const Accordion = ({ open, onClick, title, children, }) => {
    return (_jsxs(Box, Object.assign({ marginBottom: 2, bgcolor: "white" }, { children: [_jsx(Button, Object.assign({ size: "small", component: "div", fullWidth: true, onClick: onClick, style: {
                    height: 48,
                    borderRadius: 0,
                    justifyContent: "start",
                    paddingInline: "2rem",
                } }, { children: title }), void 0),
            _jsx(Collapse, Object.assign({ in: open, timeout: "auto" }, { children: _jsx(Box, Object.assign({ marginTop: 2, paddingY: 2 }, { children: children }), void 0) }), void 0)] }), void 0));
};
const InfoFields = ({ loading, classroom }) => {
    return (_jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 6 }, { children: _jsx(Box, Object.assign({ paddingX: 2 }, { children: _jsx(FormField, { variant: "outlined", label: "Judul konten", name: "title", disabled: loading, fullWidth: true }, void 0) }), void 0) }), void 0),
                    _jsx(Grid, Object.assign({ item: true, sm: 6 }, { children: _jsx(Box, Object.assign({ paddingX: 2 }, { children: _jsx(SectionField, { name: "sectionId", disabled: loading, label: "Mata pelajaran", variant: "outlined", classroom: classroom }, void 0) }), void 0) }), void 0)] }), void 0),
            _jsxs(Box, Object.assign({ padding: 2 }, { children: [_jsx(Typography, { children: "Deskripsi" }, void 0),
                    _jsx(Box, Object.assign({ borderRadius: 8, bgcolor: "#eaeff1" }, { children: _jsx(TextEditor, { name: "description" }, void 0) }), void 0)] }), void 0)] }, void 0));
};
const UploaderField = ({ showUpload, loading }) => {
    return (_jsx(_Fragment, { children: showUpload ? (_jsx(Box, Object.assign({ padding: 1 }, { children: _jsx(Field, { disabled: loading }, void 0) }), void 0)) : null }, void 0));
};
export const Form = (props) => {
    const [view, setView] = useState(0);
    const height = useHeight(2);
    return (_jsx(FileUploadProvider, Object.assign({ name: "content", accept: "application/pdf,video/*" }, { children: _jsx(Grid, Object.assign({ container: true, style: { height } }, { children: _jsx(Grid, Object.assign({ item: true, sm: 8 }, { children: _jsxs(Box, { children: [_jsx(Accordion, Object.assign({ open: view === 0, onClick: () => setView(0), title: "Informasi konten" }, { children: _jsx(InfoFields, Object.assign({}, props), void 0) }), void 0),
                        _jsxs(Accordion, Object.assign({ open: view === 1, onClick: () => setView(1), title: "Konten" }, { children: [_jsx(UploaderField, Object.assign({}, props), void 0),
                                _jsxs(Box, Object.assign({ padding: 1 }, { children: [_jsx(FileWatcher, {}, void 0),
                                        _jsx(Box, Object.assign({ paddingTop: 2 }, { children: _jsx(Button, Object.assign({ disabled: props.loading, onClick: props.handler, startIcon: props.loading ? _jsx(CircularProgress, { size: 15 }, void 0) : _jsx(Save, {}, void 0), fullWidth: true, variant: "contained", color: "primary" }, { children: "Upload konten" }), void 0) }), void 0)] }), void 0)] }), void 0)] }, void 0) }), void 0) }), void 0) }), void 0));
};
