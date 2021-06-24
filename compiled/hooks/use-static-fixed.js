import { useEffect, useState } from "react";
import { useToggle } from "@hooks/use-toggle";
import { useNodeRef } from "@hooks/use-node-ref";
export function useStaticFixed(key = "top") {
    const [staticPos, setStaticPos] = useState(0);
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
    const { nodeRef } = useNodeRef({
        callback(e) {
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
