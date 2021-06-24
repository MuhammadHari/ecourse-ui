import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { SectionModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { sectionSelector } from "./selector";

export const useFetchSection = (identifier: string = "id") => {
  const params = useParams<any>();
  const id = params[identifier];
  const [section, { fetch }] = useFetchQuery<SectionModelType>({
    queryKey: RootStoreBaseQueries.querySection,
    builder: sectionSelector,
  });
  useEffect(() => {
    if (id) {
      fetch({ id });
    }
  }, [id]);
  return section as SectionModelType;
};
