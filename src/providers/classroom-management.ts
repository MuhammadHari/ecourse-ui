import { ClassRoomModelSelector, ClassRoomModelType } from "@root/models";
import { showPageFactory } from "@utils/show-page-factory";
import { RootStoreBaseQueries } from "@root-model";
import { useState } from "react";
import { useToggle } from "@hooks/use-toggle";

const builder = (selector: ClassRoomModelSelector) => {
  return selector.grade.id.grade.sectionCount.photo.id.studentCount.sectionCount.sections(
    (m) => m.id.title.contentCount
  );
};
export type Path = "students" | "contents" | "section" | "add-content";
const useCustomHook = () => {
  const [path, updatePath] = useState<Path>("students");
  const [shouldRender, { force }] = useToggle();
  return {
    path,
    updatePath,
    shouldRender,
    loadContent: force(true),
  };
};
const { useShow, wrapper } = showPageFactory<
  ClassRoomModelType,
  ReturnType<typeof useCustomHook>
>({
  paramKey: "id",
  builder,
  queryKey: RootStoreBaseQueries.queryClassroom,
  customHook: useCustomHook,
});
export const useClassroomManagement = useShow;
export const wrapClassroomManagement = wrapper;
