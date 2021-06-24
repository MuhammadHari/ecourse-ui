import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Grid, makeStyles, Paper, Typography, } from "@material-ui/core";
import { observer } from "mobx-react";
const useClasses = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("md")]: {
            height: "20vh",
        },
    },
    img: {
        height: "100%",
        width: "100%",
        ...theme.shape,
    },
}));
export const ContentCard = observer(({ content }) => {
    const classes = useClasses();
    return (_jsx(Paper, { children: _jsxs(Grid, Object.assign({ container: true, className: classes.root }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 3 }, { children: _jsx("img", { className: classes.img, src: content.thumbnail }, void 0) }), void 0),
                _jsx(Grid, Object.assign({ item: true, style: { flexGrow: 1 } }, { children: _jsxs(Box, Object.assign({ paddingX: 2 }, { children: [_jsx(Typography, Object.assign({ variant: "h4" }, { children: content.title }), void 0),
                            _jsx(Divider, {}, void 0),
                            _jsx(Typography, { children: content.type }, void 0)] }), void 0) }), void 0)] }), void 0) }, void 0));
});
