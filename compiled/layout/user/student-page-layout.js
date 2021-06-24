import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Divider, Grid } from "@material-ui/core";
export const StudentPageLayout = ({ header, navigator, content }) => {
    return (_jsxs(_Fragment, { children: [header ? (_jsxs(Box, Object.assign({ marginBottom: 1 }, { children: [_jsx(Box, Object.assign({ height: 48, display: "flex", alignItems: "center" }, { children: header }), void 0),
                    _jsx(Divider, {}, void 0)] }), void 0)) : null,
            _jsxs(Grid, Object.assign({ container: true }, { children: [navigator ? (_jsx(Grid, Object.assign({ sm: 3, item: true }, { children: navigator }), void 0)) : null,
                    _jsx(Grid, Object.assign({ sm: navigator ? 9 : 12, item: true }, { children: content }), void 0)] }), void 0)] }, void 0));
};
