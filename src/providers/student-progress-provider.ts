import { useParams } from "react-router-dom";
import {
  ContentModelType,
  ProgressModelSelector,
  ProgressModelType,
  StudentClassroomModelType,
  useQuery,
} from "@root/models";
import { pageListNonPaginatorFactory } from "@utils/page-list-provider";
import { RootStoreBaseQueries } from "@root-model";
import {
  studentSectionWrapper,
  useStudentContent,
} from "./student-section-provider";
import { ComponentType, useEffect, useRef } from "react";

const argumentGetter = () => {
  /**
   * Section id
   */
  const { id } = useParams<{ id: string }>();
  return { section: id };
};
const builder = (selector: ProgressModelSelector) => {
  return selector.id.section_id.content_id.played.status;
};

const useProgressUtils = ({ data }: { data: Array<ProgressModelType> }) => {
  const { selected, setSelected } = useStudentContent();
  const getProgress = () => {
    if (selected)
      return data.find((item) => {
        return item.content_id === selected.id;
      });
    return null;
  };
  const getProgressByContent = (content: ContentModelType) => {
    return data.find((item) => item.content_id === content.id);
  };
  const { store: root } = useQuery<{ progressUpdate: ProgressModelType }>();
  const playedRef = useRef<number>(0);

  const resetPlayedRef = (a?: any) => {
    playedRef.current = 0;
    return a;
  };

  useEffect(() => {
    resetPlayedRef();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selected]);

  const callback = (current: ProgressModelType): Promise<any> => {
    return root
      .mutateProgressUpdate({
        id: current.id,
        played: Math.floor(playedRef.current),
      })
      .currentPromise();
  };

  const switchContent = (content: ContentModelType) => {
    return () => {
      const v = playedRef.current as number;
      const prev = getProgressByContent(selected as ContentModelType);
      if (prev && (prev.played as number) < v) {
        return callback(prev as ProgressModelType).then(() => {
          resetPlayedRef();
          setSelected(content);
        });
      } else setSelected(content);
    };
  };

  return {
    active: getProgress(),
    playedRef,
    switchContent,
    getProgressByContent,
  };
};

export const studentProgressUtils = pageListNonPaginatorFactory<
  StudentClassroomModelType,
  ReturnType<typeof useProgressUtils>
>({
  query: RootStoreBaseQueries.queryStudentProgress,
  builder,
  argumentGetter,
  customComparator(arg) {
    return Boolean(arg.data.length);
  },
  customHook: useProgressUtils,
});

export const StudentProgressProvider = (c: ComponentType<any>) =>
  studentSectionWrapper(studentProgressUtils.wrapper(c));
export const useStudentProgress = studentProgressUtils.useProvider;
