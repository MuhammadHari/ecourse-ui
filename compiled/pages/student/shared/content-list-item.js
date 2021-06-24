import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "@hooks/use-navigate";
import { Avatar, ListItem, ListItemAvatar, ListItemIcon, ListItemText, useTheme, } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { observer } from "mobx-react";
export function useNavigateToContent() {
    const { navigateHandler } = useNavigate();
    return (model) => {
        return navigateHandler("/content/:sectionId/:contentId", {
            sectionId: model.sectionId,
            contentId: model.id,
        });
    };
}
export const ContentListItem = observer(({ model: item, selected, onClick, avatar }) => {
    const isComplete = item.progress.completed;
    const theme = useTheme();
    return (_jsxs(ListItem, Object.assign({ onClick: onClick, selected: selected, button: true }, { children: [avatar ? (_jsx(ListItemAvatar, { children: _jsx(Avatar, { src: item.thumbnail }, void 0) }, void 0)) : null,
            _jsx(ListItemText, { secondary: item.title }, void 0),
            isComplete ? (_jsx(ListItemIcon, { children: _jsx(CheckCircle, { style: { color: theme.palette.success.main } }, void 0) }, void 0)) : null] }), item.id));
});
