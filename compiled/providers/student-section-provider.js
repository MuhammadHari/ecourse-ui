import { pageListNonPaginatorFactory } from "@utils/page-list-provider";
import { RootStoreBaseQueries } from "@root-model";
import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { useEffect } from "react";
const argumentGetter = () => {
    const { id } = useParams();
    return { id };
};
const sectionBuilder = (selector) => {
    return selector.id.title.pdfCount.videoCount.contentCount.classroomId.classroom((i) => i.id.grade);
};
const useSectionInfo = () => {
    const params = useParams();
    const [section, { fetch }] = useFetchQuery({
        builder: sectionBuilder,
        queryKey: RootStoreBaseQueries.querySection,
    });
    useEffect(() => {
        if (params.id) {
            fetch(params);
        }
    }, [params]);
    return {
        section: section,
    };
};
const builder = (selector) => {
    return selector
        .user((i) => i.id.name)
        .id.title.classroomId.description.duration.mediaContent.pageNumber.thumbnail.type.createdAt.progress((i) => i.id.content_id.played.section_id.pageNumber.contentType.duration);
};
const studentSectionProvider = pageListNonPaginatorFactory({
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
