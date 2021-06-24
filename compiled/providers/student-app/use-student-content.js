import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { useFetchSection } from "@providers/student-app/student-section-provider";
import { contentSelector } from "./selector";
export function useStudentContentProgress() {
    const { contentId } = useParams();
    const section = useFetchSection("sectionId");
    const [content, { fetch }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryContent,
        builder: contentSelector,
    });
    useEffect(() => {
        if (contentId) {
            fetch({ id: contentId });
        }
    }, [contentId]);
    return {
        content: content,
        progress: content?.progress,
        section,
    };
}
