import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { selectFieldFactory } from "./select-field";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useState } from "react";
const mapper = ({ id, title }) => ({
    value: id,
    label: title,
});
export const SectionField = ({ classroom = null, ...props }) => {
    const [sections, { fetch }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.querySections,
    });
    const [options, setOptions] = useState([]);
    React.useEffect(() => {
        if (sections) {
            setOptions([...sections.map(mapper)]);
        }
    }, [sections]);
    React.useEffect(() => {
        if (classroom && classroom.sections) {
            setOptions([...classroom.sections.map(mapper)]);
        }
        if (!classroom) {
            fetch({});
        }
    }, [classroom]);
    const Node = selectFieldFactory(options);
    return options.length ? _jsx(Node, Object.assign({}, props), void 0) : _jsx(_Fragment, {}, void 0);
};
