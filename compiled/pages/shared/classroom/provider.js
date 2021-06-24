import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { classroomServices } from "@services/classroom";
import { Redirect, useParams } from "react-router-dom";
import { useLayout } from "@root/layout/layout-provider";
import { observer } from "mobx-react";
import { gradeUtils } from "@utils/grade-tranform";
const useFetch = classroomServices.queryClassroom;
const Context = createContext(null);
export const useShowClassrom = () => {
    return useContext(Context);
};
export const Provider = observer(({ children }) => {
    const [path, updatePath] = useState("contents");
    const { classroom } = useFetch();
    const param = useParams();
    const { updateNav, updateTitle } = useLayout();
    React.useEffect(() => {
        if (classroom) {
            updateTitle("Menagemen ruang kelas " + gradeUtils.find(classroom.grade).label);
        }
    }, [classroom]);
    React.useEffect(() => { }, [path]);
    if (!param.id) {
        return _jsx(Redirect, { to: "/home" }, void 0);
    }
    return !classroom ? null : (_jsx(Context.Provider, Object.assign({ value: { path, updatePath, classroom } }, { children: children }), void 0));
});
export const Wrap = (Com) => {
    return (props) => {
        return (_jsx(Provider, { children: _jsx(Com, Object.assign({}, props), void 0) }, void 0));
    };
};
