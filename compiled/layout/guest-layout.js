import { jsx as _jsx } from "react/jsx-runtime";
import { makeStyles } from "@material-ui/core";
const useClasses = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100vw",
        background: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));
export const GuestLayout = ({ children }) => {
    const classes = useClasses();
    return _jsx("div", Object.assign({ className: classes.root }, { children: children }), void 0);
};
