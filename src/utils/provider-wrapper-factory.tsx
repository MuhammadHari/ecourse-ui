import { createContext, useContext, useState } from "react";
import { observer } from "mobx-react";
import { usePaginator } from "@hooks/use-paginator";
import * as React from "react";

export function providerWrapperFactory<T>(
  useProviderValue: () => T,
  useShouldRenderChild?: (v: T) => boolean
) {
  const Context = createContext<T | null>(null);

  const Provider =observer( ({ children }: any) => {
    const ctx = useProviderValue();
    const renderChild = useShouldRenderChild ? useShouldRenderChild(ctx) : true;
    return (
      <Context.Provider value={ctx}>
        {renderChild ? children : null}
      </Context.Provider>
    );
  });

  const useProvider = () => {
    return useContext(Context) as T;
  };

  const wrapper = (Comp: React.ComponentType<any>) => {
    return (p: any) => {
      return (
        <Provider>
          <Comp {...p} />
        </Provider>
      );
    };
  };

  return { Provider, useProvider, wrapper };
}
