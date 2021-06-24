import * as React from "react";
import { useParams } from "react-router-dom";
import { createContext, useContext, useEffect } from "react";
import { RootStoreBaseQueries } from "@root-model";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { observer } from "mobx-react";

type Options<Other> = {
  paramKey: string;
  queryKey: RootStoreBaseQueries;
  builder(a: any): any;
  parseVariables?(v: any): Record<string, any>;
  customHook?(): Other;
};

export type IShowPageOf<T, OtherHooks = Record<string, any>> = {
  model: T;
  refreshModel(): void;
} & OtherHooks;

export function showPageFactory<T, OtherHooks>({
  paramKey,
  queryKey,
  builder,
  parseVariables,
  customHook,
}: Options<OtherHooks>) {
  const Context = createContext<IShowPageOf<T, OtherHooks> | null>(null);
  const useShow = () => {
    const v = useContext(Context);
    return v as IShowPageOf<T, OtherHooks>;
  };

  const Provider = observer(({ children }: any) => {
    const params = useParams<{ [k in typeof paramKey]: any }>();
    const [model, { fetch }] = useFetchQuery<T>({
      queryKey,
      builder,
    });
    const other = (customHook ? customHook() : {}) as OtherHooks;

    const refreshModel = () => {
      fetch(parseVariables ? parseVariables(params) : params);
    };

    useEffect(() => {
      refreshModel();
    }, [params]);
    const ctx: IShowPageOf<T, OtherHooks> = {
      ...other,
      refreshModel,
      model: model as T,
    };
    return !model ? null : (
      <Context.Provider value={ctx}>{children}</Context.Provider>
    );
  });
  const wrapper = (Com: React.ComponentType<any>) =>
    ProviderWrapper(Provider, Com);
  return { useShow, Provider, wrapper };
}
