import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { useToggle } from "@hooks/use-toggle";
import { useContentList } from "./provider";
import { useTeacherContent } from "@providers/teacher-content-provider";
const Context = createContext(null);
export function useContentProvider() {
    return useContext(Context);
}
const getHookValue = () => {
    const base = useContentList();
    if (!base) {
        return useTeacherContent();
    }
    return base;
};
export const ContentProvider = ({ children }) => {
    const [isContentLoaded, { force, inline }] = useToggle();
    const [mode, setMode] = useState("discussion");
    const { selected } = getHookValue();
    useEffect(() => {
        if (selected) {
            fetch(selected.mediaContent)
                .then(() => {
                console.log("keep called");
                setMode("view");
                inline(true);
            })
                .catch(() => {
                force(false)();
            });
        }
    }, [selected]);
    const ctxVal = {
        mode,
        isContentLoaded,
        contentUrl: selected ? selected.mediaContent : "",
        changeMode: setMode,
        content: selected,
    };
    return (_jsx(_Fragment, { children: selected ? (_jsx(Context.Provider, Object.assign({ value: ctxVal }, { children: children }), void 0)) : null }, void 0));
};
