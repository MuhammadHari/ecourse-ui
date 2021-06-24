import React, { CSSProperties, useEffect, useState } from "react";
import { useToggle } from "@hooks/use-toggle";
import { useNodeRef } from "@hooks/use-node-ref";

type UseStaticFixed<T> = {
  staticPos: number;
  style: CSSProperties;
  nodeRef: React.MutableRefObject<T | null>;
};

export function useStaticFixed<T extends HTMLElement = HTMLElement>(
  key: "top" | "bottom" = "top"
): UseStaticFixed<T> {
  const [staticPos, setStaticPos] = useState<number>(0);
  const [fixed, { inline }] = useToggle();
  useEffect(() => {
    const cb = () => {
      const isTop = key === "top";
      const n = isTop ? window.pageYOffset + 10 : window.pageYOffset - 10;
      inline(n > staticPos);
    };
    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, [staticPos]);
  const { nodeRef } = useNodeRef<T>({
    callback(e: T) {
      if (!staticPos) {
        setStaticPos(e.getBoundingClientRect()[key]);
      }
    },
  });
  return {
    nodeRef,
    staticPos,
    style: {
      [key]: fixed ? 0 : staticPos,
      position: fixed ? "fixed" : "static",
    },
  };
}
