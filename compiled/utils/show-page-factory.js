import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { createContext, useContext, useEffect } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { observer } from "mobx-react";
export function showPageFactory({ paramKey, queryKey, builder, parseVariables, customHook, }) {
    const Context = createContext(null);
    const useShow = () => {
        const v = useContext(Context);
        return v;
    };
    const Provider = observer(({ children }) => {
        const params = useParams();
        const [model, { fetch }] = useFetchQuery({
            queryKey,
            builder,
        });
        const other = (customHook ? customHook() : {});
        const refreshModel = () => {
            fetch(parseVariables ? parseVariables(params) : params);
        };
        useEffect(() => {
            refreshModel();
        }, [params]);
        const ctx = {
            ...other,
            refreshModel,
            model: model,
        };
        return !model ? null : (_jsx(Context.Provider, Object.assign({ value: ctx }, { children: children }), void 0));
    });
    const wrapper = (Com) => ProviderWrapper(Provider, Com);
    return { useShow, Provider, wrapper };
}
