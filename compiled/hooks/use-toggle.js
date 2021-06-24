import { useCallback, useState } from "react";
export function useToggle(initial = false) {
    const [loading, setLoading] = useState(initial);
    const force = useCallback((v) => {
        return () => setLoading(v);
    }, []);
    const toggle = useCallback(() => {
        setLoading(!loading);
    }, [loading]);
    return [loading, { force, toggle, inline: setLoading }];
}
