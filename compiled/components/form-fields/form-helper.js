import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useFormState } from "react-hook-form";
import { FormHelperText } from "@material-ui/core";
export const FormHelper = ({ name }) => {
    const { errors } = useFormState();
    if (!errors[name])
        return _jsx(React.Fragment, {}, void 0);
    const { message } = errors[name];
    return _jsx(FormHelperText, Object.assign({ error: true }, { children: message }), void 0);
};
