import { jsx as _jsx } from "react/jsx-runtime";
import { usePaginator } from "@hooks/use-paginator";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useCallback, useContext, useEffect, useState, } from "react";
import { observer } from "mobx-react";
import { orderBy, find } from "lodash";
export const discussionBuilder = (instance) => {
    return instance.id.content.title.replyCount.created_at.user((i) => i.name);
};
export const replyBuilder = (instance) => {
    return instance.id.user((i) => i.id.name).content.created_at.updated_at;
};
const Context = createContext(null);
export function useDiscussionPaginator() {
    return useContext(Context);
}
export const Provider = observer(({ content, children }) => {
    const arg = { id: content.id, first: 5 };
    const { data, ...paginator } = usePaginator({
        queryKey: RootStoreBaseQueries.queryDiscussion,
        initial: arg,
        modelBuilder: discussionBuilder,
        keepResult: true,
    });
    useEffect(() => {
        paginator.reset();
    }, [content]);
    const [{ id, mode }, setter] = useState({
        id: "",
        mode: null,
    });
    const getItems = useCallback(() => {
        return orderBy(data, "created_at", "desc");
    }, [data]);
    const getSelected = useCallback(() => {
        return find(getItems(), { id }) ?? null;
    }, [id, getItems]);
    const updateSelected = useCallback(({ id: selectedId }, mode = "view") => {
        setter({
            id: selectedId,
            mode,
        });
    }, [id]);
    const close = useCallback(() => {
        setter({
            id: "",
            mode: null,
        });
    }, []);
    const refresh = () => paginator.updateVars(arg);
    const ctx = {
        ...paginator,
        data: getItems(),
        selected: getSelected(),
        updateSelected,
        content,
        close,
        refresh,
        mode,
    };
    return _jsx(Context.Provider, Object.assign({ value: ctx }, { children: children }), void 0);
});
