import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "./header";
import { Container } from "@material-ui/core";
export const StudentLayout = ({ children }) => {
    return (_jsxs("div", Object.assign({ style: { minHeight: "100vh", background: "#eaeff1" } }, { children: [_jsx(Header, {}, void 0),
            _jsx("div", { children: _jsx(Container, { children: children }, void 0) }, void 0)] }), void 0));
};
