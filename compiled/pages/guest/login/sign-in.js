import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Layout } from "@guest-pages/shared/layout";
import { Box, Button, Grid, makeStyles, Paper, Typography, } from "@material-ui/core";
import { observer } from "mobx-react";
import { authService } from "@services/auth";
import { FormField } from "@fields/form-field";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useNavigate } from "@hooks/use-navigate";
import { useApp } from "@providers/app-provider/provider";
const useLogin = authService.login;
const useClasses = makeStyles((theme) => ({
    field: {},
    submitContainer: {
        position: "absolute",
        botttom: theme.spacing(3),
    },
}));
const fields = [
    { name: "email", type: "email", label: "Your email" },
    { name: "password", type: "password", label: "Your Password" },
];
const Form = observer(() => {
    const { result, provider: Provider, handler } = useLogin({});
    const classes = useClasses();
    const app = useApp();
    const [user, { fetch }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryAuth,
    });
    const { navigateHandler } = useNavigate();
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
    return (_jsx(Provider, { children: _jsxs("form", Object.assign({ onSubmit: handler }, { children: [fields.map(({ name, ...rest }) => (_jsx(Box, Object.assign({ paddingY: 3 }, { children: _jsx(FormField, Object.assign({ fullWidth: true, variant: "filled", name: name, InputProps: {
                            disableUnderline: true,
                        } }, rest, { className: classes.field }), void 0) }), name))),
                _jsx("div", Object.assign({ className: classes.submitContainer }, { children: _jsx(Button, Object.assign({ variant: "outlined", color: "primary", type: "submit" }, { children: "Login" }), void 0) }), void 0)] }), void 0) }, void 0));
});
export const SignIn = () => {
    return (_jsx(Layout, { children: _jsxs(Grid, Object.assign({ style: {
                background: "transparent",
                zIndex: 2,
                position: "absolute",
                top: 0,
                minHeight: "80vh",
            }, container: true }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 12, md: 6, style: { display: "flex" } }, { children: _jsx(Box, Object.assign({ flexGrow: 1, display: "flex", padding: 5 }, { children: _jsx(Paper, Object.assign({ style: { flexGrow: 1 } }, { children: _jsxs(Box, Object.assign({ padding: 5 }, { children: [_jsx(Typography, Object.assign({ variant: "h3" }, { children: "Sign in" }), void 0),
                                    _jsx(Form, {}, void 0)] }), void 0) }), void 0) }), void 0) }), void 0),
                _jsxs(Grid, Object.assign({ item: true, sm: 12, md: 6 }, { children: [_jsx(Typography, Object.assign({ style: { color: "white" }, variant: "h1" }, { children: "Welcome" }), void 0),
                        _jsx(Typography, { children: "Did not have an account ?" }, void 0),
                        _jsx(Box, { children: _jsx(Button, Object.assign({ fullWidth: true, variant: "outlined", color: "default" }, { children: "Click here to sign up" }), void 0) }, void 0)] }), void 0)] }), void 0) }, void 0));
};
