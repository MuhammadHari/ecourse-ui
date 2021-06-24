import { types } from "mobx-state-tree";
import { Role, RootStore, UserModel, UserModelType } from "@root/models";
import { GraphQLClient } from "graphql-request";

export const rootStore = RootStore.create(undefined, {
  gqlHttpClient: new GraphQLClient("/graphql", {
    credentials: "include",
  }),
});

const userRef = types.reference(UserModel, {
  get(id: any) {
    return (rootStore.users.get(id) as UserModelType) ?? null;
  },
  set(v) {
    return v.id;
  },
});

const AppStore = types
  .model({
    user: types.maybeNull(userRef),
    mode: types.enumeration(["GUEST", Role.Adm, Role.Student, Role.Teacher]),
  })
  .actions((self: any) => ({
    updateUser(user: null | UserModelType) {
      if (user) {
        self.user = user;
        self.mode = user.role;
        return;
      }
      self.user = null;
      self.mode = "GUEST";
    },
  }));

export const appStore = AppStore.create({
  user: null,
  mode: "GUEST",
});
