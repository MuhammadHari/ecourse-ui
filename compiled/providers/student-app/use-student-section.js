import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { sectionSelector } from "./selector";
export function useStudentSection() {
    const [data, { fetch, loading }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.querySectionByStudentClassroom,
        builder: sectionSelector,
    });
    useEffect(() => fetch({}), []);
    return {
        sections: data ?? [],
        loading,
    };
}
