import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { ContentModelType, ProgressModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { useFetchSection } from "@providers/student-app/student-section-provider";
import { contentSelector } from "./selector";

export function useStudentContentProgress() {
  const { contentId } = useParams<any>();
  const section = useFetchSection("sectionId");
  const [content, { fetch }] = useFetchQuery<ContentModelType>({
    queryKey: RootStoreBaseQueries.queryContent,
    builder: contentSelector,
  });

  useEffect(() => {
    if (contentId) {
      fetch({ id: contentId });
    }
  }, [contentId]);
  return {
    content: content as ContentModelType,
    progress: content?.progress as ProgressModelType,
    section,
  };
}
