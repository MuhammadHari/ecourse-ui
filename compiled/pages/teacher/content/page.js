import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TeacherContentProvider } from "@providers/teacher-content-provider";
import { ContentList } from "./content-list";
import { Box, Grid } from "@material-ui/core";
import { useHeight } from "@hooks/use-height";
import { ContentViewer } from "./content-viewer";
const TeacherContent = () => {
    const height = useHeight();
    return (_jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ lg: 3, item: true, md: 4 }, { children: _jsx("div", Object.assign({ style: { height } }, { children: _jsx(ContentList, {}, void 0) }), void 0) }), void 0),
            _jsx(Grid, Object.assign({ item: true, lg: 9, md: 8 }, { children: _jsx(Box, Object.assign({ style: { height, overflowY: "auto", overflowX: "hidden" } }, { children: !height ? null : _jsx(ContentViewer, {}, void 0) }), void 0) }), void 0)] }), void 0));
};
export const Page = () => {
    return (_jsx(TeacherContentProvider, { children: _jsx(TeacherContent, {}, void 0) }, void 0));
};
