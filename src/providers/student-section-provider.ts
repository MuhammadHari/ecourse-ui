import { pageListNonPaginatorFactory } from "@utils/page-list-provider";
import { RootStoreBaseQueries } from "@root-model";
import {
  ContentModelSelector,
  ContentModelType,
  SectionModelSelector,
  SectionModelType,
} from "@root/models";
import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { useEffect } from "react";

const argumentGetter = () => {
  const { id } = useParams<{ id: string }>();
  return { id };
};
const sectionBuilder = (selector: SectionModelSelector) => {
  return selector.id.title.pdfCount.videoCount.contentCount.classroomId.classroom(
    (i) => i.id.grade
  );
};

const useSectionInfo = () => {
  const params = useParams<{ id: string }>();
  const [section, { fetch }] = useFetchQuery<SectionModelType>({
    builder: sectionBuilder,
    queryKey: RootStoreBaseQueries.querySection,
  });
  useEffect(() => {
    if (params.id) {
      fetch(params);
    }
  }, [params]);
  return {
    section: section as SectionModelType,
  };
};

const builder = (selector: ContentModelSelector) => {
  return selector
    .user((i) => i.id.name)
    .id.title.classroomId.description.duration.mediaContent.pageNumber.thumbnail.type.createdAt.progress(
      (i) => i.id.content_id.played.section_id.pageNumber.contentType.duration
    );
};

const studentSectionProvider = pageListNonPaginatorFactory<
  ContentModelType,
  ReturnType<typeof useSectionInfo>
>({
  query: RootStoreBaseQueries.queryContentBySection,
  argumentGetter,
  builder,
  customHook: useSectionInfo,
  customComparator(arg) {
    return Boolean(arg.section);
  },
});

export const studentSectionWrapper = studentSectionProvider.wrapper;
export const useStudentContent = studentSectionProvider.useProvider;
