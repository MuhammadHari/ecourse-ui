import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StudentPageLayout } from "@root/layout/user/student-page-layout";
import { Box, Button, Grid, IconButton, LinearProgress, Paper, Typography, } from "@material-ui/core";
import { ArrowBack, PlayArrow } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useFetchSection } from "@providers/student-app/student-section-provider";
import { useNavigate } from "@hooks/use-navigate";
const Navigator = ({ model }) => {
    return (_jsx("div", {}, void 0));
};
const ContentCard = ({ model }) => {
    const p = model.progress.completion;
    const { navigateHandler } = useNavigate();
    return (_jsxs(Paper, Object.assign({ variant: "outlined" }, { children: [p ? _jsx(LinearProgress, { variant: "determinate", value: p }, void 0) : null,
            _jsxs(Box, Object.assign({ padding: 1, display: "flex", alignItems: "center" }, { children: [_jsx(Typography, Object.assign({ style: { flex: 1 }, color: "textSecondary" }, { children: model.title }), void 0),
                    _jsx(Button, Object.assign({ onClick: navigateHandler("/content/:sectionId/:contentId", {
                            contentId: model.id,
                            sectionId: model.sectionId,
                        }), color: "primary", variant: "contained", size: "small", startIcon: _jsx(PlayArrow, {}, void 0) }, { children: "Mulai belajar" }), void 0)] }), void 0)] }), void 0));
};
const Content = ({ model }) => {
    const contents = model.contents ?? [];
    return (_jsx("div", { children: _jsx(Grid, Object.assign({ container: true }, { children: contents.map((item) => (_jsx(Grid, Object.assign({ item: true, sm: 6 }, { children: _jsx(Box, Object.assign({ padding: 1 }, { children: _jsx(ContentCard, { model: item }, void 0) }), void 0) }), item.id))) }), void 0) }, void 0));
};
const Header = () => {
    const { back } = useNavigate();
    return (_jsxs(Box, Object.assign({ flex: 1, alignItems: "center", display: "flex" }, { children: [_jsx(IconButton, Object.assign({ onClick: back, style: { marginRight: "1rem" } }, { children: _jsx(ArrowBack, {}, void 0) }), void 0),
            _jsx(Typography, Object.assign({ variant: "h6", color: "textSecondary", style: { fontWeight: "bolder" } }, { children: "Mata pelajaran" }), void 0)] }), void 0));
};
export const Section = observer(() => {
    const section = useFetchSection();
    if (!section) {
        return _jsx(_Fragment, {}, void 0);
    }
    return (_jsx(StudentPageLayout, { header: _jsx(Header, {}, void 0), content: _jsx(Content, { model: section }, void 0) }, void 0));
});
