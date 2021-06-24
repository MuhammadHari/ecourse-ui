import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StudentPageLayout } from "@root/layout/user/student-page-layout";
import { ContentViewer } from "./content-viewer";
import { ContentSwitcher } from "./content-switcher";
import { Box, Button, ButtonGroup, IconButton, Typography, } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";
import { useStudentContentProgress } from "@providers/student-app/use-student-content";
import { observer } from "mobx-react";
import { useNavigateToContent } from "@pages/student/shared/content-list-item";
const useContentSwitcher = (content, section) => {
    const items = section.contents;
    const currentIndex = items.findIndex((i) => i.id === content.id);
    const navigate = useNavigateToContent();
    const prev = () => {
        if (currentIndex === -1)
            return;
        return navigate(items[currentIndex - 1])();
    };
    const next = () => {
        if (currentIndex === items.length - 1)
            return;
        return navigate(items[currentIndex + 1])();
    };
    return { next, prev, currentIndex, itemlen: items.length - 1 };
};
const Header = ({ section, content, }) => {
    const { back } = useNavigate();
    const { next, prev, currentIndex, itemlen } = useContentSwitcher(content, section);
    return (_jsxs(Box, Object.assign({ flex: 1, alignItems: "center", display: "flex" }, { children: [_jsx(IconButton, Object.assign({ onClick: back, style: { marginRight: "1rem" } }, { children: _jsx(ArrowBack, {}, void 0) }), void 0),
            _jsx(Typography, Object.assign({ variant: "h6", color: "textSecondary", style: { fontWeight: "bolder", flex: 1 } }, { children: section.title }), void 0),
            _jsxs(ButtonGroup, Object.assign({ size: "small", variant: "contained", color: "primary" }, { children: [_jsx(Button, Object.assign({ disabled: currentIndex === 0, onClick: prev }, { children: "Sebelumnya" }), void 0),
                    _jsx(Button, Object.assign({ disabled: currentIndex === itemlen, onClick: next }, { children: "Selanjutnya" }), void 0)] }), void 0)] }), void 0));
};
export const Page = observer(() => {
    const { content, section } = useStudentContentProgress();
    if (!section || !content) {
        return _jsx(_Fragment, {}, void 0);
    }
    return (_jsx(StudentPageLayout, { navigator: _jsx(ContentSwitcher, { section: section }, void 0), content: _jsx(ContentViewer, { content: content }, void 0), header: _jsx(Header, { content: content, section: section }, void 0) }, void 0));
});
