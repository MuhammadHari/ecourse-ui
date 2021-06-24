import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Divider, LinearProgress, Paper, Typography, } from "@material-ui/core";
import { useStudentSection } from "@providers/student-app/use-student-section";
import { observer } from "mobx-react";
import { useNavigate } from "@hooks/use-navigate";
export const Progress = observer(() => {
    const { sections } = useStudentSection();
    const { navigateHandler } = useNavigate();
    return (_jsxs(Box, Object.assign({ paddingY: 2 }, { children: [_jsx(Box, Object.assign({ marginBottom: 1 }, { children: _jsx(Typography, Object.assign({ variant: "h4" }, { children: "Progress anda" }), void 0) }), void 0),
            _jsx(Divider, {}, void 0),
            _jsx(Box, Object.assign({ padding: 1, marginTop: 2 }, { children: sections.map((item) => {
                    return (_jsx(Box, Object.assign({ paddingBottom: 2 }, { children: _jsx(Paper, { children: _jsxs(Box, Object.assign({ padding: 2 }, { children: [_jsxs(Box, Object.assign({ alignItems: "center", display: "flex" }, { children: [_jsx(Typography, Object.assign({ style: { flex: 1 } }, { children: item.title }), void 0),
                                            _jsx(Button, Object.assign({ onClick: navigateHandler("/section/:id", { id: item.id }), size: "small", variant: "outlined", color: "primary" }, { children: "Tampilkan mata pelajaran" }), void 0)] }), void 0),
                                    _jsxs(Box, Object.assign({ alignItems: "center", paddingY: 1, display: "flex" }, { children: [_jsx(LinearProgress, { variant: "determinate", value: item.progress, style: { flex: 1, marginRight: "1rem" } }, void 0),
                                            _jsxs(Typography, Object.assign({ variant: "caption" }, { children: [item.progress, " %"] }), void 0)] }), void 0)] }), void 0) }, void 0) }), item.id));
                }) }), void 0)] }), void 0));
});
