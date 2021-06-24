import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useController } from "react-hook-form";
import { createContext, createRef, useContext } from "react";
const Ctx = createContext(null);
export const useFileUpload = () => useContext(Ctx);
class Provider extends React.Component {
    fileRef;
    constructor(props) {
        super(props);
        this.fileRef = createRef();
        this.state = {
            previewUrl: this.props.initialUrl ?? "",
            type: "",
        };
    }
    handler = () => {
        if (this.fileRef.current) {
            this.fileRef.current.click();
        }
    };
    getContext = () => {
        return {
            clickHandler: this.handler,
            reset: this.reset,
            ...this.state,
        };
    };
    setFormValue = (file) => {
        const { field } = this.props.controller;
        field.onChange(file);
    };
    reset = () => {
        const { field } = this.props.controller;
        field.onChange(undefined);
        this.setState({
            previewUrl: "",
            type: "",
        });
    };
    onChange = (e) => {
        const files = e.target.files;
        if (files && files.length) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            this.setState({ previewUrl: url, type: file.type }, () => {
                this.props.controller && this.setFormValue(file);
            });
        }
    };
    render() {
        return (_jsxs(Ctx.Provider, Object.assign({ value: this.getContext() }, { children: [this.props.children, _jsx("input", { ref: this.fileRef, onChange: this.onChange, type: "file", accept: this.props.accept, style: { display: "none" } }, void 0)] }), void 0));
    }
}
export const FileUploadProvider = ({ children, name, ...rest }) => {
    const controller = useController({
        name,
    });
    return (_jsx(Provider, Object.assign({ name: name }, rest, { controller: controller }, { children: children }), void 0));
};
