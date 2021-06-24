import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { sectionSelector } from "./selector";
export const useFetchSection = (identifier = "id") => {
    const params = useParams();
    const id = params[identifier];
    const [section, { fetch }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.querySection,
        builder: sectionSelector,
    });
    useEffect(() => {
        if (id) {
            fetch({ id });
        }
    }, [id]);
    return section;
};
