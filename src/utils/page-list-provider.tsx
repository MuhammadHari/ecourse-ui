import * as React from "react";
import { Opt, usePaginator, UsePaginator } from "@hooks/use-paginator";
import { useEffect, useRef, useState } from "react";
import { RootStoreBaseQueries } from "@root-model";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { providerWrapperFactory } from "./provider-wrapper-factory";
import { isEqual } from "lodash";

type Options<T> = Opt<T>;

type Util<T> = {
  selected: T | null;
  setSelected(t: T): void;
};

type IListPage<T> = UsePaginator<T> & Util<T>;

export type IPageListNonPaginator<T, CustomHook extends Record<string, any>> = {
  data: T[];
  loading: boolean;
  refresh(): void;
} & Util<T> &
  CustomHook;

type PageListNonPaginatorOpt<
  T,
  Custom extends Record<string, any> = Record<string, any>
> = {
  query: RootStoreBaseQueries;
  argumentGetter(): Record<string, any>;
  builder(e: any): typeof e;
  customHook?: (ctx?: IPageListNonPaginator<T, any>) => Custom;
  customComparator?: (arg: IPageListNonPaginator<any, Custom>) => boolean;
};

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function pageListNonPaginatorFactory<
  T,
  CustomHook extends Record<string, any> = Record<string, any>
>({
  query,
  argumentGetter,
  customHook,
  builder,
  customComparator,
}: PageListNonPaginatorOpt<T, CustomHook>) {
  const useProvider = (): IPageListNonPaginator<T, CustomHook> => {
    const args = argumentGetter();
    const prevArgs = usePrevious(args);
    const [data, { fetch, loading }] = useFetchQuery<T[]>({
      queryKey: query,
      builder,
    });
    const refresh = () => fetch(args);
    const [selected, setSelected] = useState<null | T>(null);
    useEffect(() => {
      if (!isEqual(prevArgs, args)) {
        refresh();
      }
    }, [args, prevArgs]);

    const ctx = {
      data: data ?? [],
      refresh: refresh,
      selected,
      setSelected,
      loading,
    } as IPageListNonPaginator<T, CustomHook>;
    const custom = customHook ? customHook(ctx) : {};
    return {
      ...ctx,
      ...custom,
    } as IPageListNonPaginator<T, CustomHook>;
  };

  const useRenderChild = (props: IPageListNonPaginator<T, CustomHook>) => {
    const c = customComparator ? customComparator(props) : true;
    return c && props.data.length !== 0;
  };

  return providerWrapperFactory<IPageListNonPaginator<T, CustomHook>>(
    useProvider,
    useRenderChild
  );
}

export function pageListFactory<T>(initialOptions: Options<any>) {
  const useProvider = () => {
    const paginator = usePaginator<T, any>(initialOptions);
    const [selected, setSelected] = useState<null | T>(null);
    return {
      ...paginator,
      selected,
      setSelected,
    };
  };
  return providerWrapperFactory<IListPage<T>>(useProvider);
}
