import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { LogoutProvider } from "./logout-provider";
import { LayoutSwitcher } from "../../layout/layout-switcher";
import { StoreContext } from "@model";
import { observer } from "mobx-react";
import { Dev } from "./dev-component";
import { appStore, rootStore } from "./app";
import { useToggle } from "@hooks/use-toggle";
const Context = createContext(appStore);
export function useApp() {
    return useContext(Context);
}
function useCustomApp({ user }) {
    // if (user && user.role === Role.Student) {
    //   return StudentApp;
    // }
    return React.Fragment;
}
const App = observer(({ children }) => {
    const [auth, { isNull, fetch, loading }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryAuth,
        builder(instance) {
            return instance.role.name.id.email.grade;
        },
    });
    const [initializing, { inline }] = useToggle(true);
    useEffect(() => {
        inline(true);
        fetch({});
    }, []);
    useEffect(() => {
        if (isNull) {
            appStore.updateUser(null);
            inline(false);
        }
    }, [isNull]);
    useEffect(() => {
        if (auth) {
            appStore.updateUser(auth);
            inline(false);
        }
    }, [auth]);
    const Application = useCustomApp(appStore);
    return (_jsx(Context.Provider, Object.assign({ value: appStore }, { children: _jsx(LogoutProvider, { children: initializing || loading ? null : (_jsx(Application, { children: _jsxs(LayoutSwitcher, { children: [children, _jsx(Dev, {}, void 0)] }, void 0) }, void 0)) }, void 0) }), void 0));
});
export const Provider = ({ children }) => {
    return (_jsx(StoreContext.Provider, Object.assign({ value: rootStore }, { children: _jsx(App, { children: children }, void 0) }), void 0));
};
