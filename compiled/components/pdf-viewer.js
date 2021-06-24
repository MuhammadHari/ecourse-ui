import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { createContext, useContext } from "react";
import { Box, IconButton, Tooltip, useTheme, } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { useNodeDimension } from "@hooks/use-node-dimension";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const Ctx = createContext(null);
export class PdfViewerProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            current: 0,
        };
        if (this.props.playedRef) {
            this.props.playedRef.current = 0;
        }
    }
    onLoad = ({ numPages }) => {
        this.setState({
            total: numPages,
            current: 1,
        });
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.current !== this.state.current && this.props.playedRef) {
            this.props.playedRef.current = this.state.current;
        }
    }
    prev = () => {
        const current = this.state.current - 1;
        this.setState({
            current,
        });
    };
    next = () => {
        const current = this.state.current + 1;
        this.setState({
            current,
        });
    };
    getContextValue = () => ({
        ...this.state,
        prev: this.prev,
        next: this.next,
        nextDisabled: this.state.current === this.state.total,
        prevDisabled: this.state.current <= 1,
        onLoad: this.onLoad,
    });
    render() {
        return (_jsx(Ctx.Provider, Object.assign({ value: this.getContextValue() }, { children: this.props.children }), void 0));
    }
}
export function usePdfController() {
    return useContext(Ctx);
}
const Controller = () => {
    const { current, total, prevDisabled, nextDisabled, next, prev } = usePdfController();
    const buttons = [
        {
            title: "Halaman sebelumnya",
            icon: _jsx(ArrowBack, {}, void 0),
            onClick: prev,
            disabled: prevDisabled,
        },
        {
            title: "Halaman selanjutnya",
            icon: _jsx(ArrowForward, {}, void 0),
            onClick: next,
            disabled: nextDisabled,
        },
    ];
    const theme = useTheme();
    return (_jsxs(Box, Object.assign({ top: 0, bgcolor: theme.palette.primary.main, color: "white", display: "flex", style: { alignItems: "center" } }, { children: [_jsxs(Box, Object.assign({ marginX: 1, textAlign: "center" }, { children: [current, " / ", total] }), void 0),
            _jsx(Box, Object.assign({ marginLeft: "auto" }, { children: buttons.map((item) => (_jsx(Tooltip, Object.assign({ disableFocusListener: true, disableHoverListener: true, disableTouchListener: true, title: item.title }, { children: _jsx(IconButton, Object.assign({ disabled: item.disabled, color: "inherit", onClick: item.onClick }, { children: item.icon }), void 0) }), item.title))) }), void 0)] }), void 0));
};
const Wrap = ({ url, disableController = false, disableBottomController = false, CustomController, }) => {
    const control = usePdfController();
    const { current, onLoad } = control;
    const { nodeRef, dimension: { width }, } = useNodeDimension();
    const CustomC = CustomController ? CustomController : React.Fragment;
    return (_jsxs("div", Object.assign({ ref: nodeRef }, { children: [_jsx(CustomC, Object.assign({}, (CustomController ? control : {})), void 0),
            !disableController ? _jsx(Controller, {}, void 0) : null,
            _jsx(Document, Object.assign({ file: url, onLoadSuccess: onLoad }, { children: _jsx(Page, { width: width, pageNumber: current ?? 1 }, void 0) }), void 0),
            !disableController && !disableBottomController ? _jsx(Controller, {}, void 0) : null] }), void 0));
};
export const PdfViewer = (props) => {
    const ctx = usePdfController();
    const Wrapper = !ctx ? PdfViewerProvider : React.Fragment;
    return (_jsx(Wrapper, Object.assign({}, props, { children: _jsx(Wrap, Object.assign({}, props), void 0) }), void 0));
};
