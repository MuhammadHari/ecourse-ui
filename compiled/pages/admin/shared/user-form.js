import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { observer } from "mobx-react";
import { GradeField } from "@fields/grade-field";
import { FormField } from "@fields/form-field";
import { Box, Button } from "@material-ui/core";
const base = [
    { name: "name", label: "Nama" },
    { name: "email", label: "Email" },
    { name: "password", label: "Masukan password", type: "password" },
    {
        name: "password_confirmation",
        label: "Konfirmasi password",
        type: "password",
    },
];
export const UserForm = observer(({ handler, loading, disableGrade = false, readonlyGrade = false, }) => {
    return (_jsxs("form", Object.assign({ onSubmit: handler }, { children: [base.map((item) => (_jsx(Box, Object.assign({ mb: 2 }, { children: _createElement(FormField, Object.assign({ fullWidth: true, size: "small", variant: "outlined", disabled: loading }, item, { key: item.name })) }), item.name))),
            _jsx(Box, Object.assign({ mb: 2 }, { children: !disableGrade ? (_jsx(GradeField, { size: "small", variant: "outlined", disabled: loading || readonlyGrade, name: "grade", label: "Jenjang" }, void 0)) : null }), void 0),
            _jsx(Button, Object.assign({ type: "submit", disabled: loading, variant: "outlined" }, { children: "Simpan" }), void 0)] }), void 0));
});
