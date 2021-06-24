import { showPageFactory } from "@utils/show-page-factory";
import { RootStoreBaseQueries } from "@root-model";
import { useState } from "react";
import { useToggle } from "@hooks/use-toggle";
const builder = (selector) => {
    return selector.grade.id.grade.sectionCount.photo.id.studentCount.sectionCount.sections((m) => m.id.title.contentCount);
};
const useCustomHook = () => {
    const [path, updatePath] = useState("students");
    const [shouldRender, { force }] = useToggle();
    return {
        path,
        updatePath,
        shouldRender,
        loadContent: force(true),
    };
};
const { useShow, wrapper } = showPageFactory({
    paramKey: "id",
    builder,
    queryKey: RootStoreBaseQueries.queryClassroom,
    customHook: useCustomHook,
});
export const useClassroomManagement = useShow;
export const wrapClassroomManagement = wrapper;
