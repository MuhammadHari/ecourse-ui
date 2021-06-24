import { jsx as _jsx } from "react/jsx-runtime";
import { services } from "@services/sections";
import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useCallback, useContext, useEffect } from "react";
import { observer } from "mobx-react";
const useCreateSection = services.create;
const useUpdateSection = services.update;
const Context = createContext(null);
const SectionProvider = observer(({ children }) => {
    const params = useParams();
    const [sections, { fetch }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.querySectionByClassroom,
    });
    const getModels = useCallback(() => fetch({ ...params }), []);
    useEffect(() => {
        if (params.id) {
            getModels();
        }
    }, []);
    const context = {
        sections: sections ?? [],
        refresh: getModels,
        create: useCreateSection,
        update: useUpdateSection,
    };
    return _jsx(Context.Provider, Object.assign({ value: context }, { children: children }), void 0);
});
export function useSectionProvider() {
    return useContext(Context);
}
export const WrapSectionProvider = (Com) => {
    const Wrapper = (props) => {
        return (_jsx(SectionProvider, { children: _jsx(Com, Object.assign({}, props), void 0) }, void 0));
    };
    return Wrapper;
};
