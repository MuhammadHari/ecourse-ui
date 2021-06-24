import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReply, Provider } from "./provider";
import { Box, Divider } from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { Chatbox } from "./chatbox";
import { LoadingButton } from "@components/loading-button";
import { ArrowDropDown } from "@material-ui/icons";
import { CreateForm } from "./create-form";
const ChatBoxContainer = () => {
    const { data, loading, next, nextDisabled } = useReply();
    return (_jsxs(Box, Object.assign({ padding: 2 }, { children: [data.map((item) => (_jsx(Box, Object.assign({ marginBottom: 2 }, { children: _jsx(Chatbox, { model: item }, void 0) }), item.id))),
            _jsx(LoadingButton, Object.assign({ fullWidth: true, onClick: next, loading: loading, disabled: Boolean(nextDisabled), icon: _jsx(ArrowDropDown, {}, void 0) }, { children: "Lihat lebih" }), void 0)] }), void 0));
};
export const Content = ({ model: selected, }) => {
    return (_jsxs(Provider, Object.assign({ model: selected }, { children: [_jsx(Box, Object.assign({ paddingX: 2 }, { children: _jsx(DraftJsViewer, { data: selected.content }, void 0) }), void 0),
            _jsx(Divider, { style: { backgroundColor: "#eaeff1" } }, void 0),
            _jsx(CreateForm, { parent: selected }, void 0),
            _jsx(Divider, { style: { backgroundColor: "#eaeff1" } }, void 0),
            _jsx(ChatBoxContainer, {}, void 0)] }), void 0));
};
