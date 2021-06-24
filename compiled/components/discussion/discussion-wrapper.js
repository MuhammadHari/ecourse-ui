import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Provider, useDiscussionPaginator } from "./provider";
import { Box } from "@material-ui/core";
import { Container } from "./container";
import { LoadingButton } from "@components/loading-button";
import { ArrowDropDown } from "@material-ui/icons";
import { CreateForm } from "./create-form";
import { useCallback } from "react";
import { Editor } from "./editor";
const Paginator = () => {
    const { loading, data, nextDisabled, next, updateSelected, selected, content, } = useDiscussionPaginator();
    const onEditClick = useCallback((model) => {
        return () => {
            updateSelected(model, "edit");
        };
    }, []);
    return (_jsxs(Box, { children: [_jsx(CreateForm, { content: content }, void 0),
            data.map((item) => (_jsx(Box, Object.assign({ marginBottom: 2 }, { children: _jsx(Container, { onEditClick: onEditClick(item), item: item, selected: Boolean(selected && selected.id === item.id), onClick: () => updateSelected(item) }, item.id) }), item.id))),
            nextDisabled ? null : (_jsx(LoadingButton, Object.assign({ onClick: next, loading: loading, icon: _jsx(ArrowDropDown, {}, void 0) }, { children: "Tampilkan lainya" }), void 0)),
            _jsx(Editor, {}, void 0)] }, void 0));
};
export const DiscussionWrapper = (props) => {
    return (_jsx(Provider, Object.assign({}, props, { children: _jsx(Paginator, {}, void 0) }), void 0));
};
