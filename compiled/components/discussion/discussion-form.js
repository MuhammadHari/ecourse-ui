import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { FormField } from "@fields/form-field";
import { TextEditor } from "@fields/text-editor-field";
import { useEffect, useRef } from "react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { Box } from "@material-ui/core";
import { LoadingButton } from "@components/loading-button";
import { Save } from "@material-ui/icons";
import { useToggle } from "@hooks/use-toggle";
export const DiscussionForm = observer(({ utils, injectInput, withTitle = false, onSuccess, message, onLoading, initialValues = {}, disableToolbar = false, }) => {
    const { loading, provider: Provider, result, handler, form, setFormValue, } = utils({
        injectInput,
        initialValue: initialValues,
        inputParser({ content, ...args }) {
            return {
                ...args,
                content: JSON.stringify(content),
            };
        },
    });
    const hasV = Object.keys(initialValues).length > 0;
    const [mountForm, { inline }] = useToggle(!hasV);
    useEffect(() => {
        if (hasV) {
            inline(false);
            setFormValue(initialValues);
            inline(true);
        }
    }, [initialValues]);
    useEffect(() => {
        onLoading && onLoading(loading);
    }, [loading]);
    const editorRef = useRef(null);
    useSuccessModal({
        callback() {
            if (editorRef.current) {
                editorRef.current.reset();
            }
            form.reset({});
            onSuccess();
        },
        message,
        depedencies: Boolean(result),
    });
    return !mountForm ? null : (_jsxs(Provider, { children: [withTitle ? (_jsx(Box, Object.assign({ marginBottom: 2 }, { children: _jsx(FormField, { fullWidth: true, label: "Masukan judul diskusi", variant: "outlined", name: "title" }, void 0) }), void 0)) : null,
            _jsx(TextEditor, { disableOptions: disableToolbar, name: "content", editorRef: editorRef }, void 0),
            _jsx(Box, Object.assign({ marginTop: 2, textAlign: "right" }, { children: _jsx(LoadingButton, Object.assign({ variant: "contained", color: "primary", onClick: handler, loading: loading, icon: _jsx(Save, {}, void 0) }, { children: "Simpan" }), void 0) }), void 0)] }, void 0));
});
