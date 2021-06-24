import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useDiscussionPaginator } from "./provider";
import { service } from "@services/discussion";
import { observer } from "mobx-react";
import { DiscussionForm } from "./discussion-form";
import { useToggle } from "@hooks/use-toggle";
const useUpdate = service.update;
export const Editor = observer(() => {
    const { selected, mode, updateSelected } = useDiscussionPaginator();
    const isOpen = Boolean(selected && mode === "edit");
    const [disableClose, { inline: onLoading }] = useToggle();
    const onClose = () => {
        if (selected && !disableClose) {
            updateSelected(selected, "view");
        }
    };
    const getInitial = () => !selected
        ? {}
        : {
            content: selected.content,
            title: selected.title,
        };
    const config = {
        onSuccess: onClose,
        message: "Perubahan berhasil di simpan",
        injectInput: {
            id: selected ? selected.id : "",
        },
        onLoading,
        utils: useUpdate,
        withTitle: true,
        initialValues: getInitial(),
    };
    return (_jsxs(Dialog, Object.assign({ keepMounted: false, fullWidth: true, onClose: onClose, open: isOpen }, { children: [_jsx(DialogTitle, { children: "Edit" }, void 0),
            _jsx(DialogContent, { children: selected ? _jsx(DiscussionForm, Object.assign({}, config), void 0) : null }, void 0)] }), void 0));
});
