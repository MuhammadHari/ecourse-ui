import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Box, List } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { ContentListItem, useNavigateToContent, } from "@pages/student/shared/content-list-item";
export const ContentSwitcher = observer(({ section }) => {
    const { contentId } = useParams();
    const onClick = useNavigateToContent();
    if (!section) {
        return _jsx(_Fragment, {}, void 0);
    }
    return (_jsx(Box, Object.assign({ padding: 1 }, { children: _jsx(List, Object.assign({ dense: true, style: { padding: 0 } }, { children: section.contents.map((item) => (_jsx(ContentListItem, { onClick: onClick(item), selected: contentId === item.id, model: item }, item.id))) }), void 0) }), void 0));
});
