import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CssBaseline, Hidden, makeStyles, } from "@material-ui/core";
import { Header } from "./header";
import { Navigator } from "./navigator";
import { useClasses, drawerWidth } from "./styles";
import { useHeight } from "@hooks/use-height";
const useAppContainerStyle = makeStyles(() => ({
    root: {
        overflowY: "auto",
    },
}));
const AppContainer = ({ children }) => {
    const classes = useClasses();
    const appClasses = useAppContainerStyle();
    const height = useHeight();
    return (_jsx("main", Object.assign({ className: classes.main }, { children: _jsx("div", Object.assign({ style: {
                height,
            }, className: appClasses.root }, { children: children }), void 0) }), void 0));
};
export const AdminLayout = ({ children }) => {
    const classes = useClasses();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ className: classes.root }, { children: [_jsx(CssBaseline, {}, void 0),
                _jsxs("nav", Object.assign({ className: classes.drawer }, { children: [_jsx(Hidden, Object.assign({ smUp: true, implementation: "js" }, { children: _jsx(Navigator, { PaperProps: { style: { width: drawerWidth } }, variant: "temporary", open: mobileOpen, onClose: handleDrawerToggle }, void 0) }), void 0),
                        _jsx(Hidden, Object.assign({ xsDown: true, implementation: "css" }, { children: _jsx(Navigator, { PaperProps: { style: { width: drawerWidth } } }, void 0) }), void 0)] }), void 0),
                _jsxs("div", Object.assign({ className: classes.app }, { children: [_jsx(Header, { onDrawerToggle: handleDrawerToggle }, void 0),
                        _jsx(AppContainer, { children: children }, void 0)] }), void 0)] }), void 0) }, void 0));
};
