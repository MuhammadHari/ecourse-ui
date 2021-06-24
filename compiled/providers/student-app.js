import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { observer } from "mobx-react";
const builder = (selector) => {
    return selector.id.classroomId
        .classroom((i) => i.id.grade)
        .sectionProgress((i) => i.progress.progress.section_id);
};
export function useStudentDashboard() {
    const [result, { fetch, isNull, loading }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryStudentClassroom,
        builder,
    });
    useEffect(() => {
        fetch({});
    }, []);
    return { data: result, loading };
}
const sectionBuilder = (selector) => {
    return selector.id.contentCount.title;
};
function useStudentSection(model) {
    const [sections, { fetch, loading }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.querySectionByClassroom,
        builder: sectionBuilder,
    });
    useEffect(() => {
        if (model)
            fetch({ id: model?.classroomId });
    }, [model]);
    return { sections: sections ?? [], loading };
}
const Context = createContext(null);
export function useStudentApp() {
    return useContext(Context);
}
export const StudentApp = observer(({ children }) => {
    const { loading, data } = useStudentDashboard();
    const { sections, loading: loadingSection } = useStudentSection(data);
    const getProgress = (model) => {
        if (data?.sectionProgress) {
            const find = data?.sectionProgress.find((item) => item.section_id === model.id);
            return find ? find.progress : 0;
        }
        return 0;
    };
    const ctx = {
        data: data,
        sections,
        getProgress,
    };
    const shouldRender = !loading && !loadingSection;
    return (_jsx(Context.Provider, Object.assign({ value: ctx }, { children: shouldRender ? children : null }), void 0));
});
