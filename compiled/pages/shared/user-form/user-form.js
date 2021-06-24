import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AuthUpdateWrapper, useAuthMutation, } from "@providers/app-provider/auth-mutation";
import { FormField } from "@fields/form-field";
import { FileUploadProvider, useFileUpload } from "@fields/file-upload-field";
import { observer } from "mobx-react";
import { LoadingButton } from "@components/loading-button";
import { Save } from "@material-ui/icons";
import { Avatar, Box, Button, Paper } from "@material-ui/core";
import { useApp } from "@providers/app-provider/provider";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
const FormContainer = ({ children }) => {
    return _jsx(Box, Object.assign({ paddingY: 2 }, { children: children }), void 0);
};
const fields = [
    { name: "name", label: "Nama anda" },
    { name: "email", label: "Email anda", type: "email" },
    { name: "password", label: "Password", type: "password" },
    {
        name: "passwordConfirmation",
        label: "Konfirmasi password",
        type: "password",
    },
];
const AvatarField = observer(() => {
    const { previewUrl, clickHandler } = useFileUpload();
    const app = useApp();
    const getSrc = () => {
        if (previewUrl)
            return previewUrl;
        return app.user?.avatar ?? "";
    };
    return (_jsxs(Box, Object.assign({ textAlign: "center" }, { children: [_jsx(Box, Object.assign({ marginBottom: 2, display: "flex", justifyContent: "center" }, { children: _jsx(Avatar, { elevation: 3, component: Paper, alt: app.user?.name, src: getSrc(), style: { width: 250, height: 250 } }, void 0) }), void 0),
            _jsx(Button, Object.assign({ color: "primary", onClick: clickHandler, variant: "contained", size: "small" }, { children: "Pilih avatar" }), void 0)] }), void 0));
});
const Form = observer(() => {
    const { loading, handler, result } = useAuthMutation();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (result) {
            enqueueSnackbar("Akun anda berhasil di ubah", { variant: "success" });
        }
    }, [result]);
    return (_jsxs(_Fragment, { children: [fields.map((item) => {
                return (_jsx(FormContainer, { children: _jsx(FormField, Object.assign({ variant: "outlined", size: "small", fullWidth: true }, item), void 0) }, item.name));
            }),
            _jsx(FileUploadProvider, Object.assign({ name: "avatar", accept: "image/*" }, { children: _jsx(AvatarField, {}, void 0) }), void 0),
            _jsx(Box, Object.assign({ marginTop: 2 }, { children: _jsx(LoadingButton, Object.assign({ fullWidth: true, color: "primary", variant: "contained", onClick: handler, loading: loading, icon: _jsx(Save, {}, void 0) }, { children: "Simpan" }), void 0) }), void 0)] }, void 0));
});
export const UserForm = AuthUpdateWrapper(Form);
