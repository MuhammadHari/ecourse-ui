import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { UserForm } from "@pages/shared/user-form/user-form";
export const Account = () => {
    return (_jsxs(Box, Object.assign({ paddingY: 2 }, { children: [_jsx(Box, Object.assign({ marginBottom: 1 }, { children: _jsx(Typography, Object.assign({ variant: "h4" }, { children: "Akun" }), void 0) }), void 0),
            _jsx(Divider, {}, void 0),
            _jsx(Grid, Object.assign({ container: true }, { children: _jsx(Grid, Object.assign({ item: true, sm: 4 }, { children: _jsx(UserForm, {}, void 0) }), void 0) }), void 0)] }), void 0));
};
