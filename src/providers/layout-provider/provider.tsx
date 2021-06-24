import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useToggle } from "@hooks/use-toggle";
import { find, take } from "lodash";

type ContentHeight = {
  id: string;
  height: number;
};

type UseContentHeight = [
  (limit?: number) => number,
  (n: ContentHeight) => () => void
];

const useContentHeight = (): UseContentHeight => {
  const [heights, setHeights] = useState<ContentHeight[]>([]);
  const remove = ({ id: targetId }: ContentHeight) => {
    const filtered = heights.filter(({ id }) => targetId !== id);
    setHeights([...filtered]);
  };
  useEffect(() => {
    const cb = () => {
      const maps = heights.map((item) => {
        const node = document.getElementById(item.id);
        if (node) {
          item.height = node.getBoundingClientRect().height;
        }
        return item;
      });
      setHeights([...maps]);
    };
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, [heights]);
  const push = (item: typeof heights[number]) => {
    const f = find(heights, ["id"]);
    if (!f) {
      setHeights([...heights, item]);
      return () => remove(item);
    }
    return () => {};
  };

  const total = (limit: number = 0) => {
    const reducer = limit ? take(heights, limit) : heights;
    return reducer.reduce((n, node) => n + node.height, 0);
  };

  return [total, push];
};

const useLayoutProvider = (): ILayoutProvider => {
  const [pageTitle, setPageTitle] = useState<string>("Home");
  const { nodeRef: appbarRef } = useNodeDimension();
  const [pageHeight, pushPageHeight] = useContentHeight();
  const getContentHeight = (
    nodeOrNumber: HTMLElement | number = 0,
    limit = 0
  ) => {
    const n =
      typeof nodeOrNumber === "number"
        ? nodeOrNumber
        : nodeOrNumber.getBoundingClientRect().height;
    return window.innerHeight - (n + pageHeight(limit));
  };
  useEffect(() => {
    if (appbarRef.current) {
      const node = appbarRef.current as HTMLDivElement;
      if (!node.id) {
        node.setAttribute("id", "main-appbar");
      }
      const cb = pushPageHeight({
        id: "main-appbar",
        height: node?.getBoundingClientRect().height,
      });
      return () => cb();
    }
    return () => {};
  }, [appbarRef]);
  const [isScrollEnabled, { force }] = useToggle();
  const updateTitle = (path: string) => {
    setPageTitle(path);
    return () => {
      setPageTitle("");
    };
  };

  return {
    isScrollEnabled,
    enableScroll: force(true),
    disableScroll: force(false),
    pageTitle,
    appbarRef,
    pageHeight: getContentHeight(0, 1),
    pushPageHeight,
    updateTitle,
    getContentHeight,
  };
};

interface ILayoutProvider {
  updateTitle(p: string): () => void;
  getContentHeight(n?: number | HTMLElement, limit?: number): number;
  pushPageHeight(item: ContentHeight): () => void;
  enableScroll(): void;
  disableScroll(): void;
  isScrollEnabled: boolean;
  pageHeight: number;
  pageTitle: string;
  appbarRef: React.MutableRefObject<any>;
}

const Context = React.createContext<null | ILayoutProvider>(null);

export const useLayout = (): ILayoutProvider => {
  const v = useContext(Context);
  if (!v) {
    throw new Error("Context is null");
  }
  return v;
};

export const Provider = ({ children }: any) => {
  const context = useLayoutProvider();
  return <Context.Provider value={context}>{children}</Context.Provider>;
};
