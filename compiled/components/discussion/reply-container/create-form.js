import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@material-ui/core";
import { service } from "@services/discussion";
import { observer } from "mobx-react";
import { useReply } from "./provider";
import { DiscussionForm } from "../discussion-form";
import { useCallback } from "react";
const useCreate = service.replyCreate;
export const CreateForm = observer(({ parent }) => {
    const { refresh } = useReply();
    const getConfig = useCallback(() => {
        return {
            message: "Pesan anda berhasil di tambahkan",
            utils: useCreate,
            injectInput: {
                discussionId: parent.id,
            },
            onSuccess() {
                refresh();
                parent.localeUpdateCount();
            },
        };
    }, [parent]);
    return (_jsxs(Box, Object.assign({ paddingX: 2, paddingY: 1 }, { children: [_jsx(Typography, { children: "Tambahkan balasan :" }, void 0),
            _jsx(DiscussionForm, Object.assign({}, getConfig()), void 0)] }), void 0));
});
