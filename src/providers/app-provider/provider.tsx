import React, { createContext, useContext, useEffect } from "react";
import { Role, UserModelSelector, UserModelType } from "@root/models";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { LogoutProvider } from "./logout-provider";
import { LayoutSwitcher } from "../../layout/layout-switcher";
import { StoreContext } from "@model";
import { observer } from "mobx-react";
import { Dev } from "./dev-component";
import { appStore, rootStore } from "./app";
import { useToggle } from "@hooks/use-toggle";

type State = {
  user: null | Application.AppUser;
  mode: Role | "GUEST";
};

type UseApp = {
  updateUser(user: State["user"]): void;
} & Omit<State, "loading">;

const Context = createContext<UseApp>(appStore);

export function useApp(): UseApp {
  return useContext(Context) as UseApp;
}

function useCustomApp({ user }: UseApp): React.ComponentType<any> {
  // if (user && user.role === Role.Student) {
  //   return StudentApp;
  // }

  return React.Fragment;
}

const App = observer(({ children }: any) => {
  const [auth, { isNull, fetch, loading }] = useFetchQuery<UserModelType>({
    queryKey: RootStoreBaseQueries.queryAuth,
    builder(instance: UserModelSelector) {
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

  return (
    <Context.Provider value={appStore}>
      <LogoutProvider>
        {initializing || loading ? null : (
          <Application>
            <LayoutSwitcher>
              {children}
              <Dev />
            </LayoutSwitcher>
          </Application>
        )}
      </LogoutProvider>
    </Context.Provider>
  );
});

export const Provider = ({ children }: any) => {
  return (
    <StoreContext.Provider value={rootStore}>
      <App>{children}</App>
    </StoreContext.Provider>
  );
};
