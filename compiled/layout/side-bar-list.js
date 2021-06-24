import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useClasses } from "@root/layout/styles";
import { useLayout } from "@providers/layout-provider/provider";
import { useNavigate } from "@hooks/use-navigate";
export const SidebarList = ({ items }) => {
    const classes = useClasses();
    const { updateTitle } = useLayout();
    const { navigateHandler: navigate } = useNavigate();
    const handler = ({ path, pageTitle }) => {
        return () => {
            updateTitle(pageTitle);
            navigate(path)();
        };
    };
    return (_jsx(List, Object.assign({ component: "div" }, { children: items.map((item) => (_jsxs(ListItem, Object.assign({ onClick: handler(item), button: true, className: classes.item }, { children: [_jsx(ListItemIcon, Object.assign({ className: classes.itemIcon }, { children: item.icon }), void 0),
                _jsx(ListItemText, { classes: { primary: classes.itemPrimary }, primary: item.label }, void 0)] }), item.path))) }), void 0));
};
