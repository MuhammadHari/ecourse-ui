import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => createStyles({
    backdrop: {
        zIndex: (theme.zIndex.drawer + 1) * 1000,
        color: "#fff",
        display: "flex",
        alignItems: "center",
    },
}));
export const AppLoader = () => {
    const classes = useStyles();
    return (_jsx(_Fragment, { children: _jsx(Backdrop, Object.assign({ className: classes.backdrop, open: true }, { children: _jsxs(Box, Object.assign({ textAlign: "center" }, { children: [_jsx(CircularProgress, { color: "inherit" }, void 0),
                    _jsx(Typography, Object.assign({ align: "center", color: "inherit" }, { children: "Loading" }), void 0)] }), void 0) }), void 0) }, void 0));
};
