import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, } from "@material-ui/core";
import { useClasses as useNavigatorStyles } from "@root/layout/styles";
import { useApp } from "@providers/app-provider/provider";
import clsx from "clsx";
import { Home as HomeIcon } from "@material-ui/icons";
import { SidebarList } from "@root/layout/side-bar-list";
import { AccountNavigator } from "@root/layout/account-navigator";
import { useGetItems } from "./utils";
export const Navigator = (props) => {
    const classes = useNavigatorStyles();
    const { user } = useApp();
    const navs = useGetItems();
    return (_jsx(Drawer, Object.assign({ variant: "permanent" }, props, { children: _jsxs(List, Object.assign({ component: "nav", disablePadding: true }, { children: [_jsx(ListItem, Object.assign({ className: clsx(classes.firebase, classes.item, classes.itemCategory) }, { children: "ECOURSE" }), void 0),
                _jsxs(ListItem, Object.assign({ className: clsx(classes.item, classes.itemCategory) }, { children: [_jsx(ListItemIcon, Object.assign({ className: classes.itemIcon }, { children: _jsx(HomeIcon, {}, void 0) }), void 0),
                        _jsx(ListItemText, Object.assign({ classes: {
                                primary: classes.itemPrimary,
                                secondary: classes.secondary,
                            }, secondary: user?.email, style: { fontWeight: "bolder" } }, { children: user?.name }), void 0)] }), void 0),
                _jsx(SidebarList, { items: navs }, void 0),
                _jsx(AccountNavigator, {}, void 0)] }), void 0) }), void 0));
};
