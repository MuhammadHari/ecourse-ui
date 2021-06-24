import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useController } from "react-hook-form";
import { EditorState, convertFromRaw, convertToRaw, } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withTheme } from "@material-ui/core";
import { FormHelper } from "./form-helper";
const toolbarStyle = {
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderRadius: 8
};
const parseJson = (value) => {
    const obj = JSON.parse(value);
    if (typeof obj !== "object") {
        return parseJson(obj);
    }
    return obj;
};
const getInitial = (field) => {
    const value = field.value;
    if (!value)
        return EditorState.createEmpty();
    try {
        const json = parseJson(value);
        const checkProperty = "blocks" in json && "entityMap" in json;
        if (!checkProperty)
            return EditorState.createEmpty();
        const state = convertFromRaw(json);
        return EditorState.createWithContent(state);
    }
    catch (e) {
        return EditorState.createEmpty();
    }
};
class Field extends React.Component {
    EditorState;
    constructor(props) {
        super(props);
        this.EditorState = getInitial(this.props.field);
        if (typeof this.props.field.value === "string") {
            this.props.field.onChange(convertToRaw(this.EditorState.getCurrentContent()));
        }
        if (this.props.editorRef) {
            this.props.editorRef.current = {
                reset: this.reset,
            };
        }
    }
    reset = () => {
        this.EditorState = EditorState.createEmpty();
    };
    onEditorChange = (editor) => {
        const { field } = this.props;
        this.EditorState = editor;
        field.onChange(convertToRaw(editor.getCurrentContent()));
    };
    render() {
        const toolbar = !this.props.disableOptions
            ? {}
            : {
                options: [],
            };
        return (_jsxs(_Fragment, { children: [_jsx(Editor, { onEditorStateChange: this.onEditorChange, toolbarHidden: this.props.disableOptions, toolbarStyle: toolbarStyle, editorState: this.EditorState, toolbar: toolbar, editorStyle: {
                        minHeight: 300,
                        padding: ".5rem"
                    }, placeholder: this.props.placeholder }, void 0),
                _jsx(FormHelper, { name: this.props.field.name }, void 0)] }, void 0));
    }
}
const Node = withTheme(Field);
export const TextEditor = ({ name, editorRef, disableOptions = false, placeholder = "", }) => {
    const controller = useController({
        name,
    });
    return (_jsx(Node, Object.assign({}, controller, { placeholder: placeholder, editorRef: editorRef, disableOptions: disableOptions }), void 0));
};
