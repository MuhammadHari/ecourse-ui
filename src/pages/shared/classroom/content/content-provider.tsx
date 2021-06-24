import React, { createContext, useContext, useEffect, useState } from "react";
import { useToggle } from "@hooks/use-toggle";
import { useContentList } from "./provider";
import { ContentModelType } from "@root/models";
import { useTeacherContent } from "@providers/teacher-content-provider";

type Mode = "discussion" | "view";

type UseContentProvider = {
  mode: Mode;
  isContentLoaded: boolean;
  changeMode(mode: Mode): void;
  contentUrl: string;
  content: ContentModelType;
};

const Context = createContext<UseContentProvider | null>(null);

export function useContentProvider(): UseContentProvider {
  return useContext(Context) as UseContentProvider;
}

const getHookValue = () => {
  const base = useContentList();
  if (!base) {
    return useTeacherContent();
  }
  return base;
};

export const ContentProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [isContentLoaded, { force, inline }] = useToggle();
  const [mode, setMode] = useState<Mode>("discussion");
  const { selected } = getHookValue();
  useEffect(() => {
    if (selected) {
      fetch(selected.mediaContent as string)
        .then(() => {
          console.log("keep called");
          setMode("view");
          inline(true);
        })
        .catch(() => {
          force(false)();
        });
    }
  }, [selected]);

  const ctxVal: UseContentProvider = {
    mode,
    isContentLoaded,
    contentUrl: selected ? (selected.mediaContent as string) : "",
    changeMode: setMode,
    content: selected as ContentModelType,
  };

  return (
    <>
      {selected ? (
        <Context.Provider value={ctxVal}>{children}</Context.Provider>
      ) : null}
    </>
  );
};
