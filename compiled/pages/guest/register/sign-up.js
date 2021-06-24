import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from "@guest-pages/shared/layout";
import { Box, Button, Grid, makeStyles, Paper, Typography, } from "@material-ui/core";
import { observer } from "mobx-react";
import { authService } from "@services/auth";
import { FormField } from "@fields/form-field";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useNavigate } from "@hooks/use-navigate";
const useSignUp = authService.register;
const useClasses = makeStyles((theme) => ({
    field: {},
    submitContainer: {
        position: "absolute",
        botttom: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
}));
const fields = [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Your email" },
    { name: "password", type: "password", label: "Your Password" },
    {
        name: "passwordConfirmation",
        type: "password",
        label: "Confirm your Password",
    },
];
const Form = observer(() => {
    const { result, provider: Provider, handler, } = useSignUp({
        inputParser: ({ passwordConfirmation, ...args }) => {
            return {
                args: {
                    ...args,
                    password_confirmation: passwordConfirmation,
                },
            };
        },
    });
    const classes = useClasses();
    const { navigateHandler } = useNavigate();
    useSuccessModal({
        callback: navigateHandler("/sign-in"),
        depedencies: Boolean(result),
        message: `Please login with your account`,
    });
    return (_jsx(Provider, { children: _jsxs("form", Object.assign({ onSubmit: handler }, { children: [fields.map(({ name, ...rest }) => (_jsx(Box, Object.assign({ paddingY: 3 }, { children: _jsx(FormField, Object.assign({ fullWidth: true, variant: "filled", name: name, InputProps: {
                            disableUnderline: true,
                        } }, rest, { className: classes.field }), void 0) }), name))),
                _jsx("div", Object.assign({ className: classes.submitContainer }, { children: _jsx(Button, Object.assign({ variant: "outlined", color: "primary", type: "submit" }, { children: "Register now !" }), void 0) }), void 0)] }), void 0) }, void 0));
});
export const SignUp = () => {
    return (_jsx(Layout, { children: _jsxs(Grid, Object.assign({ style: {
                background: "transparent",
                zIndex: 2,
                position: "absolute",
                top: 0,
                minHeight: "80vh",
            }, container: true }, { children: [_jsx(Grid, Object.assign({ item: true, sm: 12, md: 6, style: { display: "flex" } }, { children: _jsx(Box, Object.assign({ flexGrow: 1, display: "flex", padding: 5 }, { children: _jsx(Paper, Object.assign({ style: { flexGrow: 1 } }, { children: _jsxs(Box, Object.assign({ padding: 5 }, { children: [_jsx(Typography, Object.assign({ variant: "h3" }, { children: "Sign in" }), void 0),
                                    _jsx(Form, {}, void 0)] }), void 0) }), void 0) }), void 0) }), void 0),
                _jsxs(Grid, Object.assign({ item: true, sm: 12, md: 6 }, { children: [_jsx(Typography, Object.assign({ style: { color: "white" }, variant: "h1" }, { children: "Welcome" }), void 0),
                        _jsx(Typography, { children: "Already has an account ?" }, void 0),
                        _jsx(Box, { children: _jsx(Button, Object.assign({ fullWidth: true, variant: "outlined", color: "default" }, { children: "Click here to sign in" }), void 0) }, void 0)] }), void 0)] }), void 0) }, void 0));
};
