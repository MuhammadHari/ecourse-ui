import { jsx as _jsx } from "react/jsx-runtime";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core";
export const Component = ({ children }) => {
    return _jsx(ThemeProvider, Object.assign({ theme: theme }, { children: children }), void 0);
};
