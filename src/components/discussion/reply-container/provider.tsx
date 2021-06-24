import { usePaginator, UsePaginator } from "@hooks/use-paginator";
import { DiscussionModelType, DiscussionReplyModelType } from "@root/models";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { replyBuilder } from "@components/discussion/provider";
import { RootStoreBaseQueries } from "@root-model";
import { orderBy } from "lodash";
import { observer } from "mobx-react";

type UseReplies = UsePaginator<
  DiscussionReplyModelType,
  {
    first: number;
    id: string;
  }
> & {
  refresh(): void;
};

const Context = createContext<null | UseReplies>(null);

export function useReply() {
  return useContext(Context) as UseReplies;
}

export const Provider = observer(
  ({
    children,
    model: selected,
  }: React.PropsWithChildren<{ model: DiscussionModelType }>) => {
    const { data, ...paginator } = usePaginator({
      queryKey: RootStoreBaseQueries.queryDiscussionReplies,
      initial: {
        id: selected ? selected.id : "",
        first: 5,
      },
      modelBuilder: replyBuilder,
      keepResult: true,
    }) as Omit<UseReplies, "refresh">;
    const getItems = useCallback(() => {
      return orderBy(data, "created_at", "desc");
    }, [data]);
    const fetch = () => paginator.updateVars({ id: selected.id, first: 5 });
    useEffect(() => {
      if (selected) {
        fetch();
      }
    }, [selected]);

    return (
      <Context.Provider
        value={{
          data: getItems(),
          refresh: fetch,
          ...paginator,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
);
