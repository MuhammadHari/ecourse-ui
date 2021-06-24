import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, List, ListItem, ListItemIcon, ListItemText, } from "@material-ui/core";
import { useClasses } from "./styles";
import { Settings, ExitToApp } from "@material-ui/icons";
import { useLogout } from "@providers/app-provider/logout-provider";
export const AccountNavigator = () => {
    const classes = useClasses();
    const { openDialog } = useLogout();
    return (_jsxs(_Fragment, { children: [_jsx(ListItem, Object.assign({ className: classes.itemHeader }, { children: _jsx(ListItemText, { classes: { primary: classes.categoryHeaderPrimary }, primary: "Account" }, void 0) }), void 0),
            _jsxs(List, Object.assign({ component: "div" }, { children: [_jsxs(ListItem, Object.assign({ button: true, className: classes.item }, { children: [_jsx(ListItemIcon, Object.assign({ className: classes.itemIcon }, { children: _jsx(Settings, {}, void 0) }), void 0),
                            _jsx(ListItemText, { classes: { primary: classes.itemPrimary }, primary: "Setting" }, void 0)] }), void 0),
                    _jsxs(ListItem, Object.assign({ onClick: openDialog, button: true, className: classes.item }, { children: [_jsx(ListItemIcon, Object.assign({ className: classes.itemIcon }, { children: _jsx(ExitToApp, {}, void 0) }), void 0),
                            _jsx(ListItemText, { classes: { primary: classes.itemPrimary }, primary: "Logout" }, void 0)] }), void 0)] }), void 0),
            _jsx(Divider, {}, void 0)] }, void 0));
};
