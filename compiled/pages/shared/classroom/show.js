import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Student } from "./student";
import { Content } from "./content";
import { Section } from "./section";
import { CreateForm } from "./content/create-form";
import { wrapClassroomManagement, useClassroomManagement, } from "@providers/classroom-management";
import { Navigator } from "./navigator";
import { useEffect } from "react";
import { useLayout } from "@providers/layout-provider/provider";
import { gradeUtils } from "@utils/grade-tranform";
const cMap = {
    contents: Content,
    students: Student,
    section: Section,
    "add-content": CreateForm,
};
const { find } = gradeUtils;
const Show = (() => {
    const { path, model } = useClassroomManagement();
    const Component = cMap[path];
    const { updateTitle } = useLayout();
    const grade = find(model.grade).label;
    useEffect(() => {
        const cleanup = updateTitle(`Menagemen kelas ${grade}`);
        return () => cleanup();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Navigator, {}, void 0),
            _jsx(Component, {}, void 0)] }, void 0));
});
export const Component = wrapClassroomManagement(Show);
