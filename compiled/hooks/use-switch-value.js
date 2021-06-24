import { useState } from "react";
export function useSwitchValue(options, initial = null) {
    const [value, setValue] = useState(() => {
        if (initial)
            return initial;
        return options[0];
    });
    const handler = (v) => {
        return () => setValue(v);
    };
    return [value, handler];
}
