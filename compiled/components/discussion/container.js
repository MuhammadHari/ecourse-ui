import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Badge, Box, makeStyles, Paper, Typography, Collapse, Divider, Button, } from "@material-ui/core";
import { ChatBubble } from "@material-ui/icons";
import { ReplyContainer } from "./reply-container";
import { observer } from "mobx-react";
import { useIsOwner } from "@hooks/use-is-owner";
const useClasses = makeStyles(() => ({
    root: {},
    title: {
        fontWeight: "bold",
    },
}));
const Info = ({ model, onClick, }) => {
    const classes = useClasses();
    const item = model;
    return (_jsxs(Box, Object.assign({ onClick: onClick, alignItems: "center", display: "flex", padding: 1, style: { cursor: "pointer" } }, { children: [_jsx(Box, Object.assign({ marginRight: 2 }, { children: _jsx(Avatar, { src: item.user.name }, void 0) }), void 0),
            _jsxs(Box, Object.assign({ flex: 1 }, { children: [_jsx(Typography, Object.assign({ className: classes.title }, { children: item.title }), void 0),
                    _jsxs(Typography, Object.assign({ variant: "caption", color: "textSecondary" }, { children: ["Di posting oleh: ", item.user.name, ", ", item.hummanize] }), void 0)] }), void 0),
            _jsx(Box, Object.assign({ paddingRight: 2 }, { children: _jsx(Badge, Object.assign({ badgeContent: item.replyCount, color: "primary" }, { children: _jsx(ChatBubble, {}, void 0) }), void 0) }), void 0)] }), void 0));
};
export const Container = observer(({ item, onClick, selected, onEditClick }) => {
    const isOwner = useIsOwner({ model: item });
    return (_jsxs(Paper, { children: [_jsx(Info, { model: item, onClick: onClick }, void 0),
            _jsxs(Collapse, Object.assign({ unmountOnExit: true, mountOnEnter: true, timeout: "auto", in: selected }, { children: [_jsx(Divider, { style: { backgroundColor: "#eaeff1" } }, void 0),
                    !isOwner ? null : _jsx(Button, Object.assign({ onClick: onEditClick }, { children: "Edit" }), void 0),
                    _jsx(Divider, { style: { backgroundColor: "#eaeff1" } }, void 0),
                    _jsx(ReplyContainer, { model: item }, void 0)] }), void 0)] }, void 0));
});
