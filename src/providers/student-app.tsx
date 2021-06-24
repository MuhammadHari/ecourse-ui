import * as React from "react";
import { createContext, useContext, useEffect } from "react";
import {
  SectionModelSelector,
  SectionModelType,
  StudentClassroomModelSelector,
  StudentClassroomModelType,
} from "@root/models";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { observer } from "mobx-react";

const builder = (selector: StudentClassroomModelSelector) => {
  return selector.id.classroomId
    .classroom((i: any) => i.id.grade)
    .sectionProgress((i: any) => i.progress.progress.section_id);
};

export function useStudentDashboard() {
  const [result, { fetch, isNull, loading }] =
    useFetchQuery<StudentClassroomModelType>({
      queryKey: RootStoreBaseQueries.queryStudentClassroom,
      builder,
    });
  useEffect(() => {
    fetch({});
  }, []);
  return { data: result, loading };
}

const sectionBuilder = (selector: SectionModelSelector) => {
  return selector.id.contentCount.title;
};

function useStudentSection(model: StudentClassroomModelType | null) {
  const [sections, { fetch, loading }] = useFetchQuery<Array<SectionModelType>>(
    {
      queryKey: RootStoreBaseQueries.querySectionByClassroom,
      builder: sectionBuilder,
    }
  );
  useEffect(() => {
    if (model) fetch({ id: model?.classroomId });
  }, [model]);
  return { sections: sections ?? [], loading };
}

interface IStudentApp {
  data: StudentClassroomModelType;
  sections: Array<SectionModelType>;
  getProgress(model: SectionModelType): number;
}

const Context = createContext<null | IStudentApp>(null);

export function useStudentApp(): IStudentApp {
  return useContext(Context) as IStudentApp;
}

export const StudentApp = observer(({ children }: any) => {
  const { loading, data } = useStudentDashboard();

  const { sections, loading: loadingSection } = useStudentSection(data);

  const getProgress = (model: SectionModelType): number => {
    if (data?.sectionProgress) {
      const find = data?.sectionProgress.find(
        (item) => item.section_id === model.id
      );
      return find ? (find.progress as number) : 0;
    }
    return 0;
  };

  const ctx: IStudentApp = {
    data: data as StudentClassroomModelType,
    sections,
    getProgress,
  };

  const shouldRender = !loading && !loadingSection;

  return (
    <Context.Provider value={ctx}>
      {shouldRender ? children : null}
    </Context.Provider>
  );
});
