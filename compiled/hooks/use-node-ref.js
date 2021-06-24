import { useEffect, useRef } from "react";
export function useNodeRef({ callback }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            callback(ref.current);
        }
    });
    return {
        nodeRef: ref,
    };
}
