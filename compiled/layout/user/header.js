import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AppBar, Avatar, Box, Button, Container, makeStyles, Paper, Typography, } from "@material-ui/core";
import { useApp } from "@providers/app-provider/provider";
import { useNavigate } from "@hooks/use-navigate";
import { observer } from "mobx-react";
import { ExitToApp } from "@material-ui/icons";
import { useLogout } from "@providers/app-provider/logout-provider";
const useClasses = makeStyles((theme) => ({
    appbar: {
        height: 48,
        display: "flex",
        justifyContent: "center",
        background: "white",
    },
    header: {
        paddingTop: 48,
        display: "flex",
        alignItems: "center",
        height: 48 * 2,
        background: theme.palette.primary.main,
        color: "white",
    },
}));
export const Header = observer(() => {
    const app = useApp();
    const classes = useClasses();
    const { navigateHandler } = useNavigate();
    const { openDialog } = useLogout();
    return (_jsxs(_Fragment, { children: [_jsx(AppBar, Object.assign({ className: classes.appbar }, { children: _jsx(Container, { children: _jsxs(Box, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsx(Box, Object.assign({ flex: 1 }, { children: _jsx(Button, Object.assign({ onClick: navigateHandler("/dashboard") }, { children: "Ruang kelas" }), void 0) }), void 0),
                            _jsx(Button, Object.assign({ onClick: openDialog, startIcon: _jsx(ExitToApp, {}, void 0) }, { children: "Keluar" }), void 0)] }), void 0) }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: classes.header }, { children: _jsx(Container, { children: _jsxs(Box, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsxs(Box, Object.assign({ flex: 1 }, { children: [_jsx(Typography, Object.assign({ variant: "h4" }, { children: app.user?.name }), void 0),
                                    _jsxs(Typography, Object.assign({ color: "textSecondary" }, { children: [app.user?.email, " | ", app.user?.gradeLabel] }), void 0)] }), void 0),
                            _jsx(Box, { children: _jsx(Avatar, { component: Paper, elevation: 3, style: { width: 50, height: 50 }, alt: app.user?.name, src: app.user?.avatar ?? "" }, void 0) }, void 0)] }), void 0) }, void 0) }), void 0)] }, void 0));
});
