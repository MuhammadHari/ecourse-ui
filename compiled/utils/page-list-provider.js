import { usePaginator } from "@hooks/use-paginator";
import { useEffect, useRef, useState } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { providerWrapperFactory } from "./provider-wrapper-factory";
import { isEqual } from "lodash";
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
export function pageListNonPaginatorFactory({ query, argumentGetter, customHook, builder, customComparator, }) {
    const useProvider = () => {
        const args = argumentGetter();
        const prevArgs = usePrevious(args);
        const [data, { fetch, loading }] = useFetchQuery({
            queryKey: query,
            builder,
        });
        const refresh = () => fetch(args);
        const [selected, setSelected] = useState(null);
        useEffect(() => {
            if (!isEqual(prevArgs, args)) {
                refresh();
            }
        }, [args, prevArgs]);
        const ctx = {
            data: data ?? [],
            refresh: refresh,
            selected,
            setSelected,
            loading,
        };
        const custom = customHook ? customHook(ctx) : {};
        return {
            ...ctx,
            ...custom,
        };
    };
    const useRenderChild = (props) => {
        const c = customComparator ? customComparator(props) : true;
        return c && props.data.length !== 0;
    };
    return providerWrapperFactory(useProvider, useRenderChild);
}
export function pageListFactory(initialOptions) {
    const useProvider = () => {
        const paginator = usePaginator(initialOptions);
        const [selected, setSelected] = useState(null);
        return {
            ...paginator,
            selected,
            setSelected,
        };
    };
    return providerWrapperFactory(useProvider);
}
