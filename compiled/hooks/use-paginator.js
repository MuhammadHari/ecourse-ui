import { createContext, useContext, useEffect, useState } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { paginator } from "@root/app";
import { uniqBy } from "lodash";
const DefaultPaginator = paginator.defaultPaginator;
const DefaultInput = paginator.defaultInput;
function usePageHandler({ current, setter, paginator = DefaultPaginator, }) {
    const { currentPage } = paginator;
    const go = (page) => {
        setter({ ...current, page });
    };
    const next = () => {
        go(currentPage + 1);
    };
    const prev = () => {
        go(currentPage - 1);
    };
    const changePerPage = (first) => {
        setter({ ...current, page: 1, first });
    };
    return {
        go,
        next,
        prev,
        changePerPage,
        prevDisabled: paginator?.currentPage === 1,
        nextDisabled: paginator?.lastPage === paginator?.currentPage,
    };
}
export function usePaginator({ queryKey, modelBuilder, initial, keepResult = false }) {
    const [items, setItems] = useState([]);
    const [paginatorInput, setPaginatorInput] = useState(() => {
        return {
            ...DefaultInput,
            ...initial,
        };
    });
    const builder = (instance) => {
        return instance
            .data(modelBuilder)
            .paginatorInfo((instance) => {
            return instance.total.currentPage.perPage.lastPage.hasMorePages.lastItem
                .count;
        });
    };
    const [result, { fetch, loading }] = useFetchQuery({
        queryKey,
        builder,
    });
    useEffect(() => {
        if (keepResult && result) {
            setItems(uniqBy([...items, ...result.data], "id"));
        }
    }, [result]);
    console.log(paginatorInput);
    useEffect(() => {
        fetch({ ...paginatorInput });
    }, [paginatorInput]);
    const pageHandler = usePageHandler({
        paginator: (result
            ? result.paginatorInfo
            : DefaultPaginator),
        current: paginatorInput,
        setter: setPaginatorInput,
    });
    const updateVars = (vars) => {
        const argslist = vars;
        const current = paginatorInput;
        Object.keys(vars).forEach((k) => {
            if (typeof vars[k] === "undefined") {
                delete argslist[k];
                delete current[k];
            }
        });
        setPaginatorInput({
            ...current,
            ...argslist,
            page: 1,
        });
        if (keepResult) {
            setItems([]);
        }
    };
    const getData = () => {
        if (keepResult)
            return items;
        return result?.data ?? [];
    };
    const reset = () => {
        if (keepResult) {
            setItems([]);
        }
        pageHandler.go(1);
    };
    return {
        ...pageHandler,
        reset,
        updateVars,
        loading,
        data: getData(),
        paginator: result?.paginatorInfo ?? DefaultPaginator,
    };
}
export const PaginatorProvider = createContext(null);
export function usePaginatorContext() {
    return useContext(PaginatorProvider);
}
