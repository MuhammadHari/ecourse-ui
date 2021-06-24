import * as React from "react";
import { StudentLayout } from "./user/student-layout";
import { AdminLayout } from "./admin/admin-layout";
import { GuestLayout } from "./guest-layout";
import { Role } from "@root/models";
import { useApp } from "@providers/app-provider/provider";
import { Provider as LayoutProvider } from "@providers/layout-provider/provider";
import { Component } from "./paper-base/component";
import { observer } from "mobx-react";

const CMap: Record<Role, React.ComponentType<React.PropsWithChildren<any>>> = {
  [Role.Student]: StudentLayout,
  [Role.Teacher]: AdminLayout,
  [Role.Adm]: AdminLayout,
};

export const LayoutSwitcher = observer(({ children }: any) => {
  const { user } = useApp();
  const Layout: React.ComponentType<any> = user
    ? CMap[user.role as Role]
    : GuestLayout;
  return (
    <Component>
      <LayoutProvider>
        <Layout>{children}</Layout>
      </LayoutProvider>
    </Component>
  );
});
