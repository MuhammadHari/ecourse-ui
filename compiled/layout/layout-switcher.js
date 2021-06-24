import { jsx as _jsx } from "react/jsx-runtime";
import { StudentLayout } from "./user/student-layout";
import { AdminLayout } from "./admin/admin-layout";
import { GuestLayout } from "./guest-layout";
import { Role } from "@root/models";
import { useApp } from "@providers/app-provider/provider";
import { Provider as LayoutProvider } from "@providers/layout-provider/provider";
import { Component } from "./paper-base/component";
import { observer } from "mobx-react";
const CMap = {
    [Role.Student]: StudentLayout,
    [Role.Teacher]: AdminLayout,
    [Role.Adm]: AdminLayout,
};
export const LayoutSwitcher = observer(({ children }) => {
    const { user } = useApp();
    const Layout = user
        ? CMap[user.role]
        : GuestLayout;
    return (_jsx(Component, { children: _jsx(LayoutProvider, { children: _jsx(Layout, { children: children }, void 0) }, void 0) }, void 0));
});
