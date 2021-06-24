import { jsx as _jsx } from "react/jsx-runtime";
import { Button, CircularProgress } from "@material-ui/core";
export const LoadingButton = ({ loading, icon, ...rest }) => {
    return (_jsx(Button, Object.assign({}, rest, { disabled: rest.disabled || loading, startIcon: loading ? _jsx(CircularProgress, { size: 15 }, void 0) : icon }), void 0));
};
