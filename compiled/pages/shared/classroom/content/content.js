import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { Box, Grid, Typography } from "@material-ui/core";
import { ContentList } from "./item-switcher";
import { Provider, useContentList } from "./provider";
import { MediaPlayer } from "./media-player";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { AnimatePresence, motion } from "framer-motion";
import { ContentHeader } from "./content-header";
import { ContentProvider, useContentProvider } from "./content-provider";
import { DiscussionViewer } from "@components/discussion";
import { useHeight } from "@hooks/use-height";
import { AppLoader } from "@components/app-loader";
const Description = () => {
    const { content: selected } = useContentProvider();
    if (!selected) {
        return null;
    }
    return _jsx(DraftJsViewer, { data: selected.description }, void 0);
};
const FadeAnimation = ({ children }) => {
    return (_jsx(motion.div, Object.assign({ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }, { children: children }), void 0));
};
export const ContentView = () => {
    const { mode, content } = useContentProvider();
    return (_jsxs(_Fragment, { children: [_jsx(ContentHeader, {}, void 0),
            _jsx(AnimatePresence, { children: mode === "discussion" ? (_jsx(FadeAnimation, { children: _jsx(DiscussionViewer, { content: content }, void 0) }, void 0)) : (_jsxs(_Fragment, { children: [_jsx(MediaPlayer, {}, void 0),
                        _jsxs(Box, Object.assign({ padding: 2, bgcolor: "white" }, { children: [_jsx(Typography, Object.assign({ style: { fontWeight: "bold" } }, { children: "Deskripsi" }), void 0),
                                _jsx("hr", {}, void 0),
                                _jsx(Description, {}, void 0)] }), void 0)] }, void 0)) }, void 0)] }, void 0));
};
const ViewMode = observer(() => {
    const height = useHeight(2);
    const { loading } = useContentList();
    return (_jsxs(FadeAnimation, { children: [loading ? _jsx(AppLoader, {}, void 0) : null,
            _jsx("div", Object.assign({ style: { height, overflow: "hidden" } }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 12, md: 2, lg: 3 }, { children: _jsx(ContentList, {}, void 0) }), void 0),
                        _jsx(Grid, Object.assign({ item: true, sm: 12, md: 10, lg: 9 }, { children: _jsx(Box, Object.assign({ style: { height }, overflow: "auto" }, { children: _jsx(ContentProvider, { children: _jsx(ContentView, {}, void 0) }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0)] }, void 0));
});
export const Content = observer(({ method = "classroom" }) => {
    return (_jsx(Provider, Object.assign({ method: method }, { children: _jsx(AnimatePresence, { children: _jsx(ViewMode, {}, void 0) }, void 0) }), void 0));
});
