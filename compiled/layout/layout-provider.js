import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "@hooks/use-navigate";
import { useNodeDimension } from "@hooks/use-node-dimension";
function useProvider() {
    const [pageTitle, setPageTitle] = useState("Home");
    const { navigateHandler } = useNavigate();
    const [secondNavigator, setSecondNavigator] = useState(null);
    const { nodeRef: appbarRef, dimension: { height }, } = useNodeDimension();
    const getContentHeight = (nodeOrNumber = 0) => {
        if (!appbarRef.current)
            return 0;
        const base = window.innerHeight - appbarRef.current?.getBoundingClientRect().height;
        if (typeof nodeOrNumber === "object") {
            return base - nodeOrNumber.getBoundingClientRect().height;
        }
        return base - nodeOrNumber;
    };
    return {
        navigate: navigateHandler,
        pageTitle,
        secondNavigator,
        appbarRef,
        appbarHeight: appbarRef.current?.getBoundingClientRect().height ?? 0,
        updateTitle: setPageTitle,
        updateNav: setSecondNavigator,
        getContentHeight,
    };
}
const Context = React.createContext(null);
export function useLayout() {
    return useContext(Context);
}
export const LayoutProvider = (props) => {
    const ctx = useProvider();
    return _jsx(Context.Provider, Object.assign({ value: ctx }, { children: props.children }), void 0);
};
