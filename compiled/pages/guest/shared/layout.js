import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from "@material-ui/core";
export const Layout = ({ children }) => {
    const theme = useTheme();
    return (_jsxs(Box, Object.assign({ position: "relative", minHeight: "70vh" }, { children: [_jsx(Box, { position: "fixed", top: 0, zIndex: 0, left: "0", height: "50vh", width: "100%", bgcolor: theme.palette.primary.light }, void 0), children] }), void 0));
};
