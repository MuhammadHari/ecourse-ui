import * as React from "react";
import { DiscussionProps } from "./type";
import { UsePaginator, usePaginator } from "@hooks/use-paginator";
import {
  ContentModelType,
  DiscussionModelSelector,
  DiscussionModelType,
  DiscussionReplyModelSelector,
} from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { observer } from "mobx-react";
import { orderBy, find } from "lodash";

export const discussionBuilder = (instance: DiscussionModelSelector) => {
  return instance.id.content.title.replyCount.created_at.user((i) => i.name);
};

export const replyBuilder = (instance: DiscussionReplyModelSelector) => {
  return instance.id.user((i) => i.id.name).content.created_at.updated_at;
};

export type UseDiscussionPaginator = UsePaginator<DiscussionModelType>;

type UseDiscussion = UseDiscussionPaginator & {
  selected: null | DiscussionModelType;
  updateSelected(
    model: DiscussionModelType,
    mode?: UseDiscussion["mode"]
  ): void;
  close(): void;
  refresh(): void;
  content: ContentModelType;
  mode: null | "view" | "edit";
};

const Context = createContext<UseDiscussion | null>(null);

export function useDiscussionPaginator(): UseDiscussion {
  return useContext(Context) as UseDiscussion;
}

export const Provider = observer(
  ({ content, children }: React.PropsWithChildren<DiscussionProps>) => {
    const arg = { id: content.id, first: 5 } as any;
    const { data, ...paginator } = usePaginator<
      DiscussionModelType,
      { id: string; first: 5 }
    >({
      queryKey: RootStoreBaseQueries.queryDiscussion,
      initial: arg,
      modelBuilder: discussionBuilder,
      keepResult: true,
    });

    useEffect(() => {
      paginator.reset();
    }, [content]);

    type S = {
      id: string;
      mode: "view" | "edit" | null;
    };

    const [{ id, mode }, setter] = useState<S>({
      id: "",
      mode: null,
    });

    const getItems = useCallback(() => {
      return orderBy(data, "created_at", "desc");
    }, [data]);

    const getSelected = useCallback((): null | DiscussionModelType => {
      return find(getItems(), { id }) ?? null;
    }, [id, getItems]);
    const updateSelected = useCallback(
      ({ id: selectedId }: DiscussionModelType, mode: S["mode"] = "view") => {
        setter({
          id: selectedId,
          mode,
        });
      },
      [id]
    );
    const close = useCallback(() => {
      setter({
        id: "",
        mode: null,
      });
    }, []);
    const refresh = () => paginator.updateVars(arg);
    const ctx: UseDiscussion = {
      ...paginator,
      data: getItems(),
      selected: getSelected(),
      updateSelected,
      content,
      close,
      refresh,
      mode,
    };
    return <Context.Provider value={ctx}>{children}</Context.Provider>;
  }
);
