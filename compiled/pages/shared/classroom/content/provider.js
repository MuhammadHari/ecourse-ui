import { jsx as _jsx } from "react/jsx-runtime";
import { useClassroomManagement } from "@providers/classroom-management";
import { usePaginator } from "@hooks/use-paginator";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
const Context = createContext(null);
export function useContentList() {
    return useContext(Context);
}
const builder = (instance) => {
    return instance.id.classroomId.type.title.description.mediaContent.thumbnail
        .classroom((i) => i.grade.id)
        .section((i) => i.title.id)
        .user((instance) => instance.id.name);
};
const useByClassroom = () => {
    const { model: classroom } = useClassroomManagement();
    console.log(classroom);
    const paginator = usePaginator({
        queryKey: RootStoreBaseQueries.queryContents,
        initial: { classroomId: classroom.id, first: 10 },
        keepResult: true,
        modelBuilder: builder,
    });
    return paginator;
};
const useByUser = () => {
    const paginator = usePaginator({
        queryKey: RootStoreBaseQueries.queryContentByUser,
        initial: { first: 10 },
        keepResult: true,
        modelBuilder: builder,
    });
    return paginator;
};
export const Provider = observer(({ children, method = "classroom", }) => {
    const paginator = method === "classroom" ? useByClassroom() : useByUser();
    const [selected, setSelected] = useState(null);
    const ctx = {
        ...paginator,
        selected,
        via: method,
        setActive(model) {
            return setSelected(model);
        },
    };
    const { data } = paginator;
    useEffect(() => {
        if (paginator.data.length) {
            setSelected(paginator.data[0]);
        }
    }, [data]);
    return _jsx(Context.Provider, Object.assign({ value: ctx }, { children: children }), void 0);
});
