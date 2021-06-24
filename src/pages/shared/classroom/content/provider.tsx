import * as React from "react";
import { useClassroomManagement } from "@providers/classroom-management";
import { UsePaginator, usePaginator } from "@hooks/use-paginator";
import { ContentModelSelector, ContentModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

type UseContentList = UsePaginator<ContentModelType> & {
  selected: null | ContentModelType;
  setActive(model: ContentModelType): void;
  via: "user" | "classroom";
};

const Context = createContext<null | UseContentList>(null);

export function useContentList() {
  return useContext(Context) as UseContentList;
}

const builder = (instance: ContentModelSelector): ContentModelSelector => {
  return instance.id.classroomId.type.title.description.mediaContent.thumbnail
    .classroom((i) => i.grade.id)
    .section((i) => i.title.id)
    .user((instance) => instance.id.name);
};

const useByClassroom = (): UsePaginator<ContentModelType> => {
  const { model: classroom } = useClassroomManagement();
  console.log(classroom);
  const paginator = usePaginator<ContentModelType>({
    queryKey: RootStoreBaseQueries.queryContents,
    initial: { classroomId: classroom.id, first: 10 },
    keepResult: true,
    modelBuilder: builder,
  });
  return paginator;
};
const useByUser = (): UsePaginator<ContentModelType> => {
  const paginator = usePaginator<ContentModelType>({
    queryKey: RootStoreBaseQueries.queryContentByUser,
    initial: { first: 10 },
    keepResult: true,
    modelBuilder: builder,
  });
  return paginator;
};

export const Provider = observer(
  ({
    children,
    method = "classroom",
  }: React.PropsWithChildren<{ method?: "user" | "classroom" }>) => {
    const paginator = method === "classroom" ? useByClassroom() : useByUser();
    const [selected, setSelected] = useState<null | ContentModelType>(null);
    const ctx: UseContentList = {
      ...paginator,
      selected,
      via: method,
      setActive(model: ContentModelType) {
        return setSelected(model);
      },
    };
    const { data } = paginator;
    useEffect(() => {
      if (paginator.data.length) {
        setSelected(paginator.data[0]);
      }
    }, [data]);
    return <Context.Provider value={ctx}>{children}</Context.Provider>;
  }
);
