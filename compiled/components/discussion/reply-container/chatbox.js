import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, IconButton, Typography, useTheme, } from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { useApp } from "@providers/app-provider/provider";
import { ArrowBack, Edit } from "@material-ui/icons";
import { useToggle } from "@hooks/use-toggle";
import { service } from "@services/discussion";
import { DiscussionForm } from "../discussion-form";
import { useIsOwner } from "@hooks/use-is-owner";
const useUpdate = service.replyUpdate;
const EditForm = ({ onSuccess, model, onLoading }) => {
    const config = {
        onSuccess,
        onLoading,
        injectInput: {
            id: model.id,
        },
        message: "Perubahan berhasil di simpan",
        utils: useUpdate,
        initialValues: {
            content: model.content,
        },
    };
    return _jsx(DiscussionForm, Object.assign({ disableToolbar: true }, config), void 0);
};
export const Chatbox = ({ model }) => {
    const app = useApp();
    const isSameUser = () => app && app.user && app.user.id === model.user.id;
    const getName = () => {
        if (isSameUser()) {
            return "Anda";
        }
        return model.user.name;
    };
    const theme = useTheme();
    const [isEditMode, { toggle, force }] = useToggle();
    const [hasLoading, { inline }] = useToggle();
    const isOwner = useIsOwner({ model, modelKey: "user.id" });
    return (_jsxs(Box, Object.assign({ display: "flex" }, { children: [_jsx(Box, Object.assign({ marginRight: 2 }, { children: _jsx(Avatar, { src: model.user.name }, void 0) }), void 0),
            _jsxs(Box, Object.assign({ flex: 1 }, { children: [_jsxs(Typography, Object.assign({ component: "div", style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        } }, { children: [getName(), !isOwner ? null : (_jsx(IconButton, Object.assign({ disabled: hasLoading, onClick: toggle, size: "small" }, { children: isEditMode ? _jsx(ArrowBack, {}, void 0) : _jsx(Edit, {}, void 0) }), void 0))] }), void 0),
                    _jsx(Typography, Object.assign({ variant: "caption", color: "textSecondary" }, { children: model.hummanize }), void 0),
                    _jsx(Box, Object.assign({ padding: 1, bgcolor: "#eaeff1", borderRadius: theme.shape.borderRadius }, { children: isEditMode ? (_jsx(EditForm, { onSuccess: force(false), model: model, onLoading: inline }, void 0)) : (_jsx(DraftJsViewer, { data: model.content }, void 0)) }), void 0)] }), void 0)] }), void 0));
};
