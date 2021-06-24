import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { service } from "@services/discussion";
import { useDiscussionPaginator } from "./provider";
import { Box, Button, Collapse, Paper } from "@material-ui/core";
import { useToggle } from "@hooks/use-toggle";
import { DiscussionForm } from "./discussion-form";
const useCreate = service.create;
export const CreateForm = ({ content }) => {
    const { refresh } = useDiscussionPaginator();
    const [open, { inline, toggle }] = useToggle();
    const config = {
        withTitle: true,
        onSuccess() {
            refresh();
            inline(false);
        },
        injectInput: {
            contentId: content.id,
        },
        message: "Diskusi anda berhasil di tambahkan",
        utils: useCreate,
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ textAlign: "right" }, { children: _jsx(Button, Object.assign({ onClick: toggle, color: open ? "secondary" : "primary", variant: "contained" }, { children: !open ? "Tambah thread diskusi" : "Tutup" }), void 0) }), void 0),
            _jsx(Box, Object.assign({ marginY: 2 }, { children: _jsx(Paper, { children: _jsx(Collapse, Object.assign({ unmountOnExit: true, mountOnEnter: true, in: open }, { children: _jsx(Box, Object.assign({ padding: 2 }, { children: _jsx(DiscussionForm, Object.assign({}, config), void 0) }), void 0) }), void 0) }, void 0) }), void 0)] }, void 0));
};
