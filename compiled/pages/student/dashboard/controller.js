import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, List, ListItem, ListItemIcon, ListItemText, useTheme, } from "@material-ui/core";
import { AccountBox, Book, Timeline } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";
import { useParams } from "react-router-dom";
const items = [
    { keyname: "courses", label: "Mata pelajaran", icon: Book },
    { keyname: "progress", label: "Progress", icon: Timeline },
    { keyname: "account", label: "Akun saya", icon: AccountBox },
];
export const Controller = () => {
    const theme = useTheme();
    const { navigateHandler } = useNavigate();
    const { tab } = useParams();
    return (_jsx(Box, Object.assign({ padding: 2 }, { children: _jsx(List, Object.assign({ style: { padding: 0 } }, { children: items.map((item) => {
                const Icon = item.icon;
                return (_jsxs(ListItem, Object.assign({ selected: tab === item.keyname, onClick: navigateHandler("/dashboard/:tab", {
                        tab: item.keyname,
                    }), button: true }, { children: [_jsx(ListItemIcon, { children: _jsx(Icon, { style: { color: theme.palette.primary.main } }, void 0) }, void 0),
                        _jsx(ListItemText, { secondary: item.label }, void 0)] }), item.keyname));
            }) }), void 0) }), void 0));
};
