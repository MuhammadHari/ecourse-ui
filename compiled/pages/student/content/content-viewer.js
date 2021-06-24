import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, } from "@material-ui/core";
import { ContentViewSwitcher } from "@pages/shared/classroom/content/media-player";
import { DiscussionWrapper } from "@components/discussion/discussion-wrapper";
import { ContentViewerHeader } from './content-viewer.header';
export const ContentViewer = ({ content }) => {
    return (_jsxs(_Fragment, { children: [_jsx(ContentViewerHeader, { content: content }, void 0),
            _jsx(Box, Object.assign({ marginBottom: 2 }, { children: _jsx(ContentViewSwitcher, { selected: content }, void 0) }), void 0),
            _jsx(DiscussionWrapper, { content: content }, void 0)] }, void 0));
};
