import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import voca from "voca";
import { useController, useFormContext, } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            options: [],
        };
    }
    onChange = (e, option) => {
        const { onChange, controller } = this.props;
        if (controller) {
            const { field } = controller;
            return field.onChange(option ? option.value : "");
        }
        if (onChange) {
            return onChange(option ? option.value : "");
        }
    };
    getValue = () => {
        const { controller } = this.props;
        const id = controller ? controller.field.value : this.props.value;
        const find = this.state.options.find((item) => item.value === id);
        return (find ?? {
            label: "",
            value: "",
        });
    };
    componentDidMount() {
        const { queryOptions, controller, onChange } = this.props;
        if (!controller && !onChange) {
            throw new Error("Please provide onChange if not using useform");
        }
        if (queryOptions) {
            const { query, builder, toOptions } = queryOptions;
            const resultKey = voca(query).replaceAll("query", "").camelCase().value();
            // @ts-ignore
            window.rootStore[query]({}, builder)
                .currentPromise()
                .then((data) => {
                if (data && data[resultKey]) {
                    const options = data[resultKey].map(toOptions);
                    this.setState({ options, loading: false });
                }
            });
        }
    }
    getOptions = () => {
        return this.state.options;
    };
    getOptionValue = (option, v) => {
        if (!v)
            return false;
        return option.value === v.value;
    };
    getOptionLabel = (option) => {
        return option.label;
    };
    getErrorProps = () => {
        const { controller } = this.props;
        if (!controller)
            return {};
        return {
            error: Boolean(controller.fieldState.error?.message),
            helperText: controller.fieldState.error?.message,
        };
    };
    render() {
        const { onChange: _, controller: __, queryOptions: ___, ...rest } = this.props;
        return (_jsx(Autocomplete, { renderInput: (props) => (_jsx(TextField, Object.assign({}, rest, props, this.getErrorProps()), void 0)), options: this.getOptions(), 
            // @ts-ignore
            onChange: this.onChange, value: this.getValue(), getOptionLabel: this.getOptionLabel, getOptionSelected: this.getOptionValue, getOptionDisabled: (opt) => opt.value === "__disabled__" }, void 0));
    }
}
export const AutoCompleteField = ({ noUseForm, name, ...rest }) => {
    const form = useFormContext();
    if (!form || noUseForm) {
        // @ts-ignore
        return _jsx(Field, Object.assign({}, rest, { name: name }), void 0);
    }
    const controller = useController({ name });
    // @ts-ignore
    return _jsx(Field, Object.assign({ name: name, controller: controller }, rest), void 0);
};
