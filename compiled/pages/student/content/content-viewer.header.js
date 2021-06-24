import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Box, Button, ButtonGroup, Typography, } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { observer } from "mobx-react";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
const useCompletionMark = mutationServiceFactory({
    schema: {},
    mutation: RootStoreBaseMutations.mutateProgressCompletionMark,
});
export const ContentViewerHeader = observer(({ content }) => {
    const { resolver, loading } = useCompletionMark({
        injectInput: {
            id: content.progress.id,
            completed: !content.progress.completed,
        },
    });
    return (_jsx(Box, Object.assign({ marginBottom: 2 }, { children: _jsx(AppBar, Object.assign({ position: "static" }, { children: _jsxs(Box, Object.assign({ padding: 1, alignItems: "center", display: "flex" }, { children: [_jsx(Typography, Object.assign({ color: "textSecondary", style: {
                            color: "white",
                            flex: 1,
                            fontWeight: "bold",
                            fontSize: "x-large",
                        } }, { children: content.title }), void 0),
                    _jsx(ButtonGroup, { children: _jsx(Button, Object.assign({ onClick: () => resolver({}), disabled: loading, startIcon: _jsx(CheckCircle, {}, void 0), size: "small", variant: "outlined", style: { color: "white" } }, { children: "Tandai telah selesai" }), void 0) }, void 0)] }), void 0) }), void 0) }), void 0));
});
