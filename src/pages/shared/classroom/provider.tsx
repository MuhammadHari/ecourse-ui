import * as React from "react";
import { createContext, useContext, useState } from "react";
import { classroomServices } from "@services/classroom";
import { Redirect, useParams } from "react-router-dom";
import { Path, ShowContext } from "./type";
import { useLayout } from "@root/layout/layout-provider";
import { observer } from "mobx-react";
import { gradeUtils } from "@utils/grade-tranform";

const useFetch = classroomServices.queryClassroom;

const Context = createContext<ShowContext | null>(null);

export const useShowClassrom = () => {
  return useContext(Context) as ShowContext;
};

export const Provider = observer(({ children }: any) => {
  const [path, updatePath] = useState<Path>("contents");
  const { classroom } = useFetch();
  const param = useParams<{ id: string }>();
  const { updateNav, updateTitle } = useLayout();
  React.useEffect(() => {
    if (classroom) {
      updateTitle(
        "Menagemen ruang kelas " + gradeUtils.find(classroom.grade).label
      );
    }
  }, [classroom]);
  React.useEffect(() => {}, [path]);
  if (!param.id) {
    return <Redirect to="/home" />;
  }
  return !classroom ? null : (
    <Context.Provider value={{ path, updatePath, classroom }}>
      {children}
    </Context.Provider>
  );
});

export const Wrap = (Com: React.ComponentType) => {
  return (props: any) => {
    return (
      <Provider>
        <Com {...props} />
      </Provider>
    );
  };
};
