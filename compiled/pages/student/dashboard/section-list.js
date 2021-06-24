import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { take } from "lodash";
import { useNavigate } from "@hooks/use-navigate";
import { ContentListItem, useNavigateToContent } from "@pages/student/shared/content-list-item";
import { Box, Button, Divider, Grid, List, Paper, Typography } from "@material-ui/core";
import { useStudentSection } from "@providers/student-app/use-student-section";
const SectionInfo = ({ model }) => {
    const items = take(model.contents, 5);
    const { navigateHandler } = useNavigate();
    const onClick = useNavigateToContent();
    return (_jsx(Box, Object.assign({ marginBottom: 1, padding: 2 }, { children: _jsxs(Paper, { children: [_jsxs(Box, Object.assign({ padding: 1, alignItems: "center", display: "flex" }, { children: [_jsx(Typography, Object.assign({ color: "textSecondary", style: { fontWeight: "bolder", flex: 1 } }, { children: model.title }), void 0),
                        _jsxs(Button, Object.assign({ onClick: navigateHandler("/section/:id", { id: model.id }), variant: "contained", color: "primary", size: "small" }, { children: ["Tampilkan semua (", model.contentCount, ")"] }), void 0)] }), void 0),
                _jsx(Divider, {}, void 0),
                _jsx(List, Object.assign({ dense: true }, { children: items.map((item) => (_jsx(ContentListItem, { selected: false, avatar: true, onClick: onClick(item), model: item }, item.id))) }), void 0)] }, void 0) }), void 0));
};
export const SectionList = () => {
    const { sections } = useStudentSection();
    return (_jsxs(Box, Object.assign({ paddingY: 2 }, { children: [_jsx(Box, Object.assign({ marginBottom: 1 }, { children: _jsx(Typography, Object.assign({ variant: "h4" }, { children: "Mata pelajaran" }), void 0) }), void 0),
            _jsx(Divider, {}, void 0),
            _jsx(Grid, Object.assign({ container: true }, { children: sections.map((item) => {
                    return (_jsx(Grid, Object.assign({ sm: 6, item: true }, { children: _jsx(SectionInfo, { model: item }, void 0) }), item.id));
                }) }), void 0)] }), void 0));
};
