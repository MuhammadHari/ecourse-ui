import * as React from "react";
import { services } from "@services/sections";
import { useParams } from "react-router-dom";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { SectionModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useCallback, useContext, useEffect } from "react";
import { observer } from "mobx-react";

const useCreateSection = services.create;
const useUpdateSection = services.update;

interface UseSectionProvider {
  sections: SectionModelType[];
  refresh: () => void;
  create: typeof useCreateSection;
  update: typeof useUpdateSection;
}

const Context = createContext<null | UseSectionProvider>(null);

const SectionProvider = observer(({ children }: any) => {
  const params = useParams<{ id: string }>();
  const [sections, { fetch }] = useFetchQuery<SectionModelType[]>({
    queryKey: RootStoreBaseQueries.querySectionByClassroom,
  });
  const getModels = useCallback(() => fetch({ ...params }), []);
  useEffect(() => {
    if (params.id) {
      getModels();
    }
  }, []);
  const context: UseSectionProvider = {
    sections: sections ?? [],
    refresh: getModels,
    create: useCreateSection,
    update: useUpdateSection,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
});
export function useSectionProvider(): UseSectionProvider {
  return useContext(Context) as UseSectionProvider;
}
export const WrapSectionProvider = (Com: React.ComponentType) => {
  const Wrapper = (props: any) => {
    return (
      <SectionProvider>
        <Com {...props} />
      </SectionProvider>
    );
  };
  return Wrapper;
};
