import * as React from "react";
import { observer } from "mobx-react";
import { Path } from "./type";
import { Student } from "./student";
import { Content } from "./content";
import { Section } from "./section";
import { CreateForm } from "./content/create-form";
import {
  wrapClassroomManagement,
  useClassroomManagement,
} from "@providers/classroom-management";
import { Navigator } from "./navigator";
import { useEffect } from "react";
import { useLayout } from "@providers/layout-provider/provider";
import { gradeUtils } from "@utils/grade-tranform";

const cMap: Record<Path, React.ComponentType<any>> = {
  contents: Content,
  students: Student,
  section: Section,
  "add-content": CreateForm,
};
const { find } = gradeUtils;
const Show = (() => {
  const { path, model } = useClassroomManagement();
  const Component = cMap[path];
  const { updateTitle } = useLayout();
  const grade = find(model.grade).label;
  useEffect(() => {
    const cleanup = updateTitle(`Menagemen kelas ${grade}`);
    return () => cleanup();
  }, []);
  return (
    <>
      <Navigator />
      <Component />
    </>
  );
});

export const Component = wrapClassroomManagement(Show);
