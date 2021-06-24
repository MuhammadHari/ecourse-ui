import { useCallback } from "react";
export function useRegexKeydown({ limit = -1, regex, whenRegexInvalid, whenRecoverError, }) {
    const testLimit = (v) => {
        if (limit === -1)
            return false;
        return v.length >= limit;
    };
    const callback = useCallback((e) => {
        const test = regex.test(e.key);
        const target = e.target;
        const isAlphaNumeric = (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90);
        if (isAlphaNumeric) {
            if (!test || testLimit(target.value)) {
                if (!test) {
                    e.preventDefault();
                    return whenRegexInvalid();
                }
                return e.preventDefault();
            }
        }
        const isInvalid = target.getAttribute("aria-invalid");
        if (isAlphaNumeric && isInvalid && isInvalid === "true") {
            return whenRecoverError();
        }
    }, []);
    return {
        onKeyDown: callback,
    };
}
