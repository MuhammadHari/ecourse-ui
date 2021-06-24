import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "@hooks/use-navigate";
import { useNodeDimension } from "@hooks/use-node-dimension";

function useProvider() {
  const [pageTitle, setPageTitle] = useState<string>("Home");
  const { navigateHandler } = useNavigate();
  const [secondNavigator, setSecondNavigator] =
    useState<React.ReactNode | null>(null);
  const {
    nodeRef: appbarRef,
    dimension: { height },
  } = useNodeDimension();

  const getContentHeight = (nodeOrNumber: HTMLElement | number = 0) => {
    if (!appbarRef.current) return 0;
    const base =
      window.innerHeight - appbarRef.current?.getBoundingClientRect().height;
    if (typeof nodeOrNumber === "object") {
      return base - nodeOrNumber.getBoundingClientRect().height;
    }
    return base - nodeOrNumber;
  };

  return {
    navigate: navigateHandler,
    pageTitle,
    secondNavigator,
    appbarRef,
    appbarHeight: appbarRef.current?.getBoundingClientRect().height ?? 0,
    updateTitle: setPageTitle,
    updateNav: setSecondNavigator,
    getContentHeight,
  };
}

type UseLayout = ReturnType<typeof useProvider>;

const Context = React.createContext<null | UseLayout>(null);

export function useLayout(): UseLayout {
  return useContext(Context) as UseLayout;
}

export const LayoutProvider = (props: React.PropsWithChildren<any>) => {
  const ctx = useProvider();
  return <Context.Provider value={ctx}>{props.children}</Context.Provider>;
};
