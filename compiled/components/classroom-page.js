import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { observer } from "mobx-react";
const Context = React.createContext(null);
export function useClassroomPage() {
    return React.useContext(Context);
}
export const ClassroomPage = (Component, rk, builder) => {
    const ClassRoomAutoload = observer(({ match }) => {
        const id = match.params[rk];
        const [value, setValue] = React.useState(null);
        const [result, { fetch, isNull }] = useFetchQuery({
            queryKey: RootStoreBaseQueries.queryClassroom,
            builder,
        });
        React.useEffect(() => {
            if (result) {
                console.log("new data is coming");
                setValue(result);
            }
        }, [result]);
        React.useEffect(() => {
            fetch({ id });
        }, []);
        if (isNull) {
            return _jsx("div", { children: "Classroom is not found" }, void 0);
        }
        if (!result || !value) {
            return null;
        }
        return (_jsx(Context.Provider, Object.assign({ value: { classroom: value, refresh: () => fetch({ id }) } }, { children: _jsx(Component, { classroom: result }, void 0) }), void 0));
    });
    return ClassRoomAutoload;
};
