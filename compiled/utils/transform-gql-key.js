import voca from "voca";
export function transformGqlKey(key) {
    return voca(key)
        .replaceAll("mutation", "")
        .replaceAll("query", "")
        .camelCase();
}
