import { jsx as _jsx } from "react/jsx-runtime";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { makeStyles } from "@material-ui/core";
const useClassses = makeStyles((theme) => ({
    root: {
        "& > *": {
            fontFamily: "Roboto!important",
        },
    },
    editor: {
        "& > *": {
            fontFamily: "Roboto!important",
        },
    },
}));
export const DraftJsViewer = ({ data }) => {
    const classes = useClassses();
    try {
        const parsed = convertFromRaw(JSON.parse(data));
        const state = EditorState.createWithContent(parsed);
        return (_jsx("div", Object.assign({ className: classes.root }, { children: _jsx(Editor, { editorClassName: classes.editor, toolbarHidden: true, readOnly: true, toolbar: {}, editorState: state }, void 0) }), void 0));
    }
    catch (e) {
        return null;
    }
};
