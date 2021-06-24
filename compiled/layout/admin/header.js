import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayout } from "@providers/layout-provider/provider";
import { AppBar, Grid, IconButton, Tooltip, Typography, useMediaQuery, useTheme, } from "@material-ui/core";
import { Help as HelpIcon, Menu } from "@material-ui/icons";
import { useAppClasses } from "./styles";
import { observer } from "mobx-react";
export const Header = observer(({ onDrawerToggle }) => {
    const classes = useAppClasses();
    const { pageTitle, appbarRef } = useLayout();
    const theme = useTheme();
    const isIsm = useMediaQuery(theme.breakpoints.down("sm"));
    return (_jsx(AppBar, Object.assign({ ref: appbarRef, className: classes.secondaryBar, color: "primary", position: "sticky" }, { children: _jsx("div", Object.assign({ style: { height: 48 } }, { children: _jsxs(Grid, Object.assign({ container: true, style: { paddingLeft: 8, paddingRight: 8 }, alignItems: "center", spacing: 1 }, { children: [_jsxs(Grid, Object.assign({ style: {
                            display: "flex",
                            alignItems: "center",
                        }, item: true, xs: true }, { children: [isIsm ? (_jsx(IconButton, Object.assign({ onClick: onDrawerToggle }, { children: _jsx(Menu, { style: { color: "white" } }, void 0) }), void 0)) : null,
                            _jsx(Typography, Object.assign({ color: "inherit", style: {
                                    fontWeight: "bolder",
                                } }, { children: pageTitle }), void 0)] }), void 0),
                    _jsx(Grid, Object.assign({ item: true }, { children: _jsx(Tooltip, Object.assign({ title: "Help" }, { children: _jsx(IconButton, Object.assign({ color: "inherit" }, { children: _jsx(HelpIcon, {}, void 0) }), void 0) }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0));
});
