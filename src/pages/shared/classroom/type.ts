import { ClassRoomModelType } from "@root/models";

export type Path =
  | "students"
  | "contents"
  | "section"
  | "add-content";
export type ShowContext = {
  path: Path;
  classroom: ClassRoomModelType;
  updatePath(path: Path): void;
};
