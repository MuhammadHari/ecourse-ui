import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { InputAdornment, TextField } from "@material-ui/core";
import voca from "voca";
import { AttachMoney } from "@material-ui/icons";
const intl = new Intl.NumberFormat("ID");
class Field extends React.Component {
    parseMoneyValue = (v) => {
        if (!v)
            return 0;
        const value = voca(v).replaceAll(".", "").value();
        return parseFloat(value);
    };
    getMoneyValue = (v) => {
        const value = voca(v).replaceAll(".", "").value();
        if (!voca(value).isDigit() || !value) {
            return intl.format(parseInt("0"));
        }
        return intl.format(this.parseMoneyValue(value));
    };
    getValue = () => {
        const { type = "text", select, controller } = this.props;
        switch (type) {
            case "number": {
                return 0;
            }
            case "money": {
                let v = 0;
                if (this.props.controller) {
                    const { field } = this.props.controller;
                    v = field.value ?? 0;
                }
                if (this.props.value !== undefined && !this.props.controller) {
                    v = this.props.value;
                }
                return this.getMoneyValue(v.toString());
            }
            default: {
                if (select) {
                    return "__default__";
                }
                if (controller) {
                    const { value } = controller.field;
                    if (!(value instanceof File)) {
                        return value ?? "";
                    }
                }
                return this.props.value ?? "";
            }
        }
    };
    handleChange = (e) => {
        const value = this.props.type === "money"
            ? this.parseMoneyValue(e.target.value)
            : e.target.value;
        const { onChange } = this.props;
        onChange && onChange(value);
        if (this.props.controller) {
            this.props.controller.field.onChange(value);
        }
    };
    propBuilder = () => {
        const { controller, ...rest } = this.props;
        const base = {
            onChange: (e) => this.handleChange(e),
            value: this.getValue(),
        };
        if (rest.type === "money") {
            base.InputProps = {
                ...(rest.InputProps ?? {}),
                startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(AttachMoney, { fontSize: "small", style: { height: 20 } }, void 0) }), void 0)),
            };
        }
        if (controller) {
            const { field: { ref, ...inputProps }, fieldState, } = controller;
            if (fieldState.error) {
                const { message } = fieldState.error;
                base.helperText = message;
                base.error = true;
            }
            base.onChange = (e) => {
                inputProps?.onChange(e);
                this.handleChange(e);
            };
            return {
                ...rest,
                ...inputProps,
                ...base,
                inputRef: ref,
                inputProps: {
                    ...(rest.inputProps ?? {}),
                },
            };
        }
        return { ...rest, ...base };
    };
    render() {
        return _jsx(TextField, Object.assign({}, this.propBuilder()), void 0);
    }
}
export const FormField = ({ noUseForm, ...rest }) => {
    const form = useFormContext();
    if (!form && !noUseForm && !rest.onChange) {
        throw new Error("Please provide onChange props if without use useForm");
    }
    if (noUseForm) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return _jsx(Field, Object.assign({}, rest), void 0);
    }
    const controller = useController({
        name: rest.name,
        control: form.control,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return _jsx(Field, Object.assign({ controller: controller }, rest), void 0);
};
