import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { Box, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import * as React from "react";
import { useContentList } from "./provider";
import { useState } from "react";
import { useClassroomManagement } from "@providers/classroom-management";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { ContentListRenderer } from "@components/content-list-renderer";
import { useHeight } from "@hooks/use-height";
const SectionDropdown = () => {
    const { model: classroom } = useClassroomManagement();
    const [selected, setSelected] = useState(null);
    const [anchor, setAnchor] = useState(null);
    const { updateVars } = useContentList();
    React.useEffect(() => {
        updateVars({
            sectionId: selected ? selected.id : undefined,
        });
    }, [selected]);
    const onItemChange = (item) => {
        return () => {
            setSelected(item);
            setAnchor(null);
        };
    };
    const onButtonClick = (e) => {
        setAnchor(e.target);
    };
    const items = classroom.sections.filter((item) => item.contentCount);
    return (_jsxs(_Fragment, { children: [_jsxs(Menu, Object.assign({ onClose: () => setAnchor(null), open: Boolean(anchor), anchorEl: anchor }, { children: [_jsx(MenuItem, Object.assign({ onClick: onItemChange(null) }, { children: "Semua mata pelajaran" }), void 0),
                    items.map((item) => (_jsx(MenuItem, Object.assign({ onClick: onItemChange(item) }, { children: item.title }), item.id)))] }), void 0),
            _jsxs(Button, Object.assign({ onClick: onButtonClick, fullWidth: true, component: "div", color: "primary", style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 0,
                } }, { children: [_jsx(Box, Object.assign({ component: "span" }, { children: !selected ? "Semua mata pelajaran" : selected.title }), void 0),
                    _jsx(Box, Object.assign({ component: "span" }, { children: _jsx(ArrowDropDown, {}, void 0) }), void 0)] }), void 0)] }, void 0));
};
const useClasses = makeStyles(() => ({
    root: {
        width: "100%",
        top: 0,
        left: 0,
        background: "white",
        flex: 0,
        position: "relative",
    },
}));
export const ContentList = observer(() => {
    const { setActive, data, via, ...rest } = useContentList();
    const { nodeRef, dimension } = useNodeDimension();
    const check = useClassroomManagement();
    const height = useHeight(3);
    return (_jsxs(_Fragment, { children: [check ? (_jsx("div", Object.assign({ style: { height: 48 }, ref: nodeRef }, { children: _jsx(SectionDropdown, {}, void 0) }), void 0)) : null,
            _jsx(Box, Object.assign({ overflow: "auto", style: { height } }, { children: _jsx(ContentListRenderer, Object.assign({ secondaryText: via, items: data }, rest, { onItemClick: setActive }), void 0) }), void 0)] }, void 0));
});
