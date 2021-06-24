import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useFormContext, } from "react-hook-form";
import { MenuItem, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
const defaultOption = {
    value: "__disabled__",
    label: "Pilih salah satu opsi",
};
export class SelectField extends React.Component {
    options;
    constructor(props) {
        super(props);
        this.options = [defaultOption, ...this.props.options];
    }
    handleFormChange = (value) => {
        if (this.props.controller) {
            const { controller } = this.props;
            if (controller) {
                const { onChange } = controller.field;
                onChange(value);
            }
        }
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
    handleChange = (e) => {
        const val = e.target.value;
        this.handleFormChange(val);
    };
    findInOption = (value) => this.options.find((item) => item.value === value);
    getErrorProps = () => {
        if (!this.props.controller) {
            return {};
        }
        const { fieldState } = this.props.controller;
        return {
            error: Boolean(fieldState.error),
            helperText: fieldState.error?.message ?? "",
        };
    };
    getValue = () => {
        const findItems = (value) => {
            if (!value)
                return "__disabled__";
            const check = this.findInOption(value);
            if (!check)
                return "__disabled__";
            return check.value;
        };
        if (this.props.controller) {
            const { field: { value }, } = this.props.controller;
            return findItems(value);
        }
        const { value } = this.props;
        return findItems(value);
    };
    getFieldProps = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { options: _, controller, ...rest } = this.props;
        return {
            ...rest,
            ...this.getErrorProps(),
            SelectProps: {
                ...(rest.SelectProps ?? {}),
                inputRef: controller?.field.ref,
            },
            onChange: this.handleChange,
            value: this.getValue(),
        };
    };
    render() {
        const fieldProps = this.getFieldProps();
        return (_jsx("div", { children: _jsx(TextField, Object.assign({}, fieldProps, { select: true, fullWidth: true }, { children: this.options.map((item) => (_jsx(MenuItem, Object.assign({ disabled: item.value === defaultOption.value, value: item.value }, { children: item.label }), item.value))) }), void 0) }, void 0));
    }
}
export const selectFieldFactory = (options) => {
    const Render = ({ name, noUseForm, ...rest }) => {
        const form = useFormContext();
        const controllerProps = noUseForm || !form
            ? {
                name,
                ...rest,
                options,
            }
            : {
                render(p) {
                    const _props = {
                        ...rest,
                        name,
                        controller: p,
                        options,
                    };
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return _jsx(SelectField, Object.assign({}, _props), void 0);
                },
                name,
            };
        if (!form || noUseForm) {
            console.log(controllerProps);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return _jsx(SelectField, Object.assign({}, controllerProps), void 0);
        }
        return _jsx(Controller, Object.assign({}, controllerProps), void 0);
    };
    return Render;
};
