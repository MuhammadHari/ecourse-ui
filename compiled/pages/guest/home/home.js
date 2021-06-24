import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { mutationServiceProvider } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";
import { string } from "yup";
import { FormField } from "@fields/form-field";
import { LoadingButton } from "@components/loading-button";
import { LockOpen } from "@material-ui/icons";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useNavigate } from "@hooks/use-navigate";
import { useApp } from "@providers/app-provider/provider";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { observer } from "mobx-react";
const fields = [
    { name: "email", type: "email", label: "Alamat email" },
    { name: "password", type: "password", label: "Kata sandi" },
];
const utils = mutationServiceProvider({
    mutation: RootStoreBaseMutations.mutateLogin,
    schema: {
        email: string().required(),
        password: string().required(),
    },
}, () => ({}));
const useLogin = utils.useProvider;
const Node = observer(() => {
    const { navigateHandler } = useNavigate();
    const { handler, loading, result } = useLogin();
    const app = useApp();
    const [user, { fetch }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryAuth,
    });
    const showModal = useSuccessModal({
        callback: navigateHandler("/dashboard"),
        depedencies: Boolean(result),
        disableAutoShow: true,
        message: !user ? "" : `Welcome ${user.name}`,
    });
    React.useEffect(() => {
        if (user) {
            app.updateUser(user);
            showModal();
        }
    }, [user]);
    React.useEffect(() => {
        if (result) {
            fetch({});
        }
    }, [result]);
    return (_jsx(Paper, Object.assign({ style: { width: "40%" } }, { children: _jsxs(Box, Object.assign({ padding: 1 }, { children: [_jsx(Typography, Object.assign({ align: "center", variant: "h3" }, { children: "Selamat datang" }), void 0),
                _jsx(Typography, Object.assign({ align: "center" }, { children: "Silahkan login" }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handler }, { children: [fields.map(({ name, ...rest }) => (_jsx(Box, Object.assign({ paddingY: 3 }, { children: _jsx(FormField, Object.assign({ fullWidth: true, variant: "filled", name: name, InputProps: {
                                    disableUnderline: true,
                                } }, rest), void 0) }), name))),
                        _jsx("div", { children: _jsx(LoadingButton, Object.assign({ loading: loading, icon: _jsx(LockOpen, {}, void 0), variant: "outlined", color: "primary", type: "submit" }, { children: "Login" }), void 0) }, void 0)] }), void 0)] }), void 0) }), void 0));
});
export const Home = utils.wrapper(Node);
