import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Box, makeStyles, Tab, Tabs, Toolbar, Typography, } from "@material-ui/core";
import { useContentProvider } from "./content-provider";
const useClasses = makeStyles(() => ({
    root: {},
    title: {
        fontWeight: "bolder",
        flex: 1,
    },
    subtitle: {},
}));
export const ContentHeader = () => {
    const classes = useClasses();
    const { changeMode, mode, content: selected } = useContentProvider();
    if (!selected)
        return null;
    return (_jsx(AppBar, Object.assign({ variant: "outlined", position: "static", className: classes.root }, { children: _jsxs(Toolbar, Object.assign({ style: { alignItems: "flex-end" } }, { children: [_jsxs(Box, Object.assign({ flex: "1", paddingY: 1 }, { children: [_jsx(Typography, Object.assign({ className: classes.title }, { children: selected.title }), void 0),
                        selected?.user ? (_jsxs(Typography, { children: [selected?.user.name, " "] }, void 0)) : null] }), void 0),
                _jsxs(Tabs, Object.assign({ value: mode, onChange: (e, v) => changeMode(v) }, { children: [_jsx(Tab, { value: "view", label: "Konten" }, void 0),
                        _jsx(Tab, { value: "discussion", label: "Diskusi" }, void 0)] }), void 0)] }), void 0) }), void 0));
};
