import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, ButtonGroup, Divider, makeStyles, Paper, Typography, } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { motion, AnimatePresence } from "framer-motion";
const useClasses = makeStyles((theme) => ({
    root: {
        backgroundSize: "cover",
        minHeight: "240px",
        position: "relative",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    info: {
        position: "absolute",
        bottom: 0,
        height: "50%",
        width: "100%",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));
const AnimatedBox = ({ children }) => {
    return (_jsx(motion.div, Object.assign({ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }, { children: children }), void 0));
};
export const ClassroomCard = ({ classroom, buttons }) => {
    const classes = useClasses();
    const [url, setUrl] = useState("");
    useEffect(() => {
        const img = document.createElement("img");
        img.setAttribute("src", classroom.photo);
        img.classList.add("d-none");
        img.addEventListener("load", () => {
            img.remove();
            setUrl(classroom.photo);
        });
        document.body.appendChild(img);
    }, []);
    return (_jsx(AnimatePresence, { children: !url ? (_jsx(AnimatedBox, { children: _jsx(Skeleton, { variant: "rect", height: 240 }, void 0) }, void 0)) : (_jsx(Paper, Object.assign({ className: classes.root, style: {
                backgroundImage: `url(${url})`,
            } }, { children: _jsxs(Box, Object.assign({ className: classes.info }, { children: [_jsx(Divider, {}, void 0),
                    _jsxs(Box, Object.assign({ width: "100%", padding: 2 }, { children: [_jsx(Typography, Object.assign({ variant: "h5", align: "center" }, { children: classroom.gradeLabel }), void 0),
                            _jsxs(Box, Object.assign({ width: "100%", display: "flex" }, { children: [_jsx(Box, Object.assign({ width: "50%", textAlign: "center" }, { children: _jsx(Typography, { children: classroom.contentCount + " konten" }, void 0) }), void 0),
                                    _jsx(Box, Object.assign({ width: "50%", textAlign: "center" }, { children: _jsx(Typography, { children: classroom.studentCount + " siswa" }, void 0) }), void 0)] }), void 0),
                            _jsx(Box, Object.assign({ paddingY: 1 }, { children: _jsx(ButtonGroup, Object.assign({ variant: "outlined" }, { children: buttons.map(({ color = "primary", ...button }) => (_createElement(Button, Object.assign({}, button, { size: "small", color: color, variant: "outlined", key: button.title }), button.title))) }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0)) }, void 0));
};
