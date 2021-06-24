import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTeacherContent } from "@providers/teacher-content-provider";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import { FormField } from "@fields/form-field";
import { useHeight } from "@hooks/use-height";
import { useEffect, useState } from "react";
import { LoadingButton } from "@components/loading-button";
import { ArrowDropDown } from "@material-ui/icons";
export const ContentList = () => {
    const { data, next, nextDisabled, loading, selected, setSelected } = useTeacherContent();
    const height = useHeight(3);
    const containerHeight = useHeight(1);
    useEffect(() => {
        if (data.length && !selected) {
            setSelected(data[0]);
        }
    }, [data]);
    const [filter, setFilter] = useState("");
    const isSelected = (model) => {
        if (!selected) {
            return false;
        }
        return Boolean(selected.id === model.id);
    };
    return (_jsxs(Box, Object.assign({ bgcolor: "white", style: { height: containerHeight } }, { children: [_jsx(Box, Object.assign({ padding: 1, zIndex: 200, position: "sticky", top: 0, style: { height: 48 } }, { children: _jsx(FormField, { fullWidth: true, noUseForm: true, onChange: setFilter, value: filter, name: "search", placeholder: "Pencarian" }, void 0) }), void 0),
            _jsx("div", Object.assign({ style: { height, overflowY: "auto" } }, { children: _jsx(List, Object.assign({ style: { paddingTop: 0 }, dense: true }, { children: data.map((item, i) => (_jsx(ListItem, Object.assign({ onClick: () => setSelected(item), selected: isSelected(item), button: true }, { children: _jsx(ListItemText, { primaryTypographyProps: {
                                variant: "caption",
                            }, primary: `${i + 1}. ${item.title}`, secondary: item.section.title }, void 0) }), item.id))) }), void 0) }), void 0),
            _jsx(LoadingButton, Object.assign({ disabled: nextDisabled, fullWidth: true, onClick: next, loading: loading, icon: _jsx(ArrowDropDown, {}, void 0) }, { children: "Tampilkan lainya" }), void 0)] }), void 0));
};
