import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, makeStyles, } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { gradeUtils } from "@utils/grade-tranform";
const Controller = ({ loading, nextDisabled, next }) => {
    const classes = useClasses();
    return nextDisabled ? null : (_jsx(ListItem, Object.assign({ dense: true, button: true, onClick: next }, { children: _jsx(ListItemText, { primary: _jsxs(_Fragment, { children: [_jsx("span", { children: loading ? "Mengambil data" : "Tampilkan lainya" }, void 0),
                    loading ? _jsx(CircularProgress, { size: "15" }, void 0) : _jsx(ArrowDropDown, {}, void 0)] }, void 0), primaryTypographyProps: {
                component: "div",
                className: classes.controller,
            } }, void 0) }), void 0));
};
const { find } = gradeUtils;
const Item = ({ item, active, onClick, secondaryText, }) => {
    const secondary = () => {
        if (secondaryText === "user") {
            return (_jsxs("span", Object.assign({ style: { display: "flex", justifyContent: "space-between" } }, { children: [_jsx("span", { children: find(item.classroom.grade).label }, void 0),
                    _jsx("span", { children: item.section.title }, void 0)] }), void 0));
        }
        return item.user.name;
    };
    return (_jsxs(ListItem, Object.assign({ dense: true, onClick: onClick, selected: active, button: true }, { children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { src: item.thumbnail }, void 0) }, void 0),
            _jsx(ListItemText, { secondary: secondary(), primary: item.title }, void 0)] }), item.id));
};
const useClasses = makeStyles(() => ({
    root: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    controller: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));
export const ContentListRenderer = ({ next, selected, loading, nextDisabled, onItemClick, items, secondaryText, }) => {
    const classes = useClasses();
    return (_jsx(Box, Object.assign({ overflow: "auto" }, { children: _jsxs(List, Object.assign({ dense: true, className: classes.root }, { children: [items.map((item) => (_jsx(Item, { secondaryText: secondaryText, item: item, active: Boolean(selected && selected.id === item.id), onClick: () => onItemClick(item) }, item.id))),
                _jsx(Controller, { next: next, loading: loading, nextDisabled: nextDisabled }, void 0)] }), void 0) }), void 0));
};
