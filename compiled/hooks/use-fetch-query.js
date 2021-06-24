import voca from "voca";
import { useQuery } from "@model";
import { useEffect, useState } from "react";
export function useFetchQuery({ queryKey, builder }) {
    const result = voca(queryKey).replace("query", "").camelCase().value();
    const [fetchResult, setResult] = useState(null);
    const { setQuery, data, loading, error } = useQuery();
    useEffect(() => {
        if (data && data[result]) {
            const val = data[result];
            setResult(val);
        }
    }, [data]);
    const fetch = (vars = {}) => {
        return setQuery((model) => {
            // @ts-ignore
            return model[queryKey](vars, builder);
        });
    };
    const isNull = () => {
        if (typeof error != "undefined") {
            const v = error?.response?.data[result] ?? (data && data[result]);
            return Boolean(v === null);
        }
        return false;
    };
    return [
        fetchResult,
        {
            loading,
            fetch,
            isNull: isNull(),
        },
    ];
}
