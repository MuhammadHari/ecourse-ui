import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useToggle } from "@hooks/use-toggle";
import { find, take } from "lodash";
const useContentHeight = () => {
    const [heights, setHeights] = useState([]);
    const remove = ({ id: targetId }) => {
        const filtered = heights.filter(({ id }) => targetId !== id);
        setHeights([...filtered]);
    };
    useEffect(() => {
        const cb = () => {
            const maps = heights.map((item) => {
                const node = document.getElementById(item.id);
                if (node) {
                    item.height = node.getBoundingClientRect().height;
                }
                return item;
            });
            setHeights([...maps]);
        };
        window.addEventListener("resize", cb);
        return () => window.removeEventListener("resize", cb);
    }, [heights]);
    const push = (item) => {
        const f = find(heights, ["id"]);
        if (!f) {
            setHeights([...heights, item]);
            return () => remove(item);
        }
        return () => { };
    };
    const total = (limit = 0) => {
        const reducer = limit ? take(heights, limit) : heights;
        return reducer.reduce((n, node) => n + node.height, 0);
    };
    return [total, push];
};
const useLayoutProvider = () => {
    const [pageTitle, setPageTitle] = useState("Home");
    const { nodeRef: appbarRef } = useNodeDimension();
    const [pageHeight, pushPageHeight] = useContentHeight();
    const getContentHeight = (nodeOrNumber = 0, limit = 0) => {
        const n = typeof nodeOrNumber === "number"
            ? nodeOrNumber
            : nodeOrNumber.getBoundingClientRect().height;
        return window.innerHeight - (n + pageHeight(limit));
    };
    useEffect(() => {
        if (appbarRef.current) {
            const node = appbarRef.current;
            if (!node.id) {
                node.setAttribute("id", "main-appbar");
            }
            const cb = pushPageHeight({
                id: "main-appbar",
                height: node?.getBoundingClientRect().height,
            });
            return () => cb();
        }
        return () => { };
    }, [appbarRef]);
    const [isScrollEnabled, { force }] = useToggle();
    const updateTitle = (path) => {
        setPageTitle(path);
        return () => {
            setPageTitle("");
        };
    };
    return {
        isScrollEnabled,
        enableScroll: force(true),
        disableScroll: force(false),
        pageTitle,
        appbarRef,
        pageHeight: getContentHeight(0, 1),
        pushPageHeight,
        updateTitle,
        getContentHeight,
    };
};
const Context = React.createContext(null);
export const useLayout = () => {
    const v = useContext(Context);
    if (!v) {
        throw new Error("Context is null");
    }
    return v;
};
export const Provider = ({ children }) => {
    const context = useLayoutProvider();
    return _jsx(Context.Provider, Object.assign({ value: context }, { children: children }), void 0);
};
