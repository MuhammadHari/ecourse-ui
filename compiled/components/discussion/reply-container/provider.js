import { jsx as _jsx } from "react/jsx-runtime";
import { usePaginator } from "@hooks/use-paginator";
import { createContext, useCallback, useContext, useEffect, } from "react";
import { replyBuilder } from "@components/discussion/provider";
import { RootStoreBaseQueries } from "@root-model";
import { orderBy } from "lodash";
import { observer } from "mobx-react";
const Context = createContext(null);
export function useReply() {
    return useContext(Context);
}
export const Provider = observer(({ children, model: selected, }) => {
    const { data, ...paginator } = usePaginator({
        queryKey: RootStoreBaseQueries.queryDiscussionReplies,
        initial: {
            id: selected ? selected.id : "",
            first: 5,
        },
        modelBuilder: replyBuilder,
        keepResult: true,
    });
    const getItems = useCallback(() => {
        return orderBy(data, "created_at", "desc");
    }, [data]);
    const fetch = () => paginator.updateVars({ id: selected.id, first: 5 });
    useEffect(() => {
        if (selected) {
            fetch();
        }
    }, [selected]);
    return (_jsx(Context.Provider, Object.assign({ value: {
            data: getItems(),
            refresh: fetch,
            ...paginator,
        } }, { children: children }), void 0));
});
