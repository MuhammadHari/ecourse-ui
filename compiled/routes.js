import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useApp } from "@providers/app-provider/provider";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { Role } from "@root/models";
import { Component as ClassroomList } from "./pages/admin/classroom/list";
import { Component as ClassroomDetail } from "./pages/shared/classroom/show";
import { Component as AdminTeacher } from "./pages/admin/teacher";
import { Component as AdminStudent } from "./pages/admin/student";
import { Page as Content } from "./pages/teacher/content/page";
import { Section as StudentSection } from "./pages/student/section/section";
import { StudentDashboard } from "@pages/student/dashboard";
import { StudentContent } from "@pages/student/content";
import { Home } from "@pages/guest/home/home";
const DefaultComponent = () => {
    const app = useApp();
    const label = app.user ? app.user.role : "GUEST";
    const loc = useLocation();
    return (_jsxs("div", { children: [_jsx("h1", { children: "Wait for implementation" }, void 0),
            _jsx("p", { children: label }, void 0),
            _jsx("p", { children: loc.pathname }, void 0)] }, void 0));
};
const adminRoutes = [
    { component: ClassroomList, path: "/classroom" },
    { component: ClassroomDetail, path: "/classroom/:id" },
    { component: AdminTeacher, path: "/teacher" },
    { component: AdminStudent, path: "/student" },
];
const studentRoutes = [
    { component: DefaultComponent, path: "/classroom/:id/section/:section_id" },
    { component: DefaultComponent, path: "/classroom/:id/section" },
    { component: DefaultComponent, path: "/classroom/:id" },
    { component: DefaultComponent, path: "/classroom" },
    { component: StudentContent, path: "/content/:sectionId/:contentId" },
    { component: StudentSection, path: "/section/:id" },
    { component: StudentDashboard, path: "/dashboard/:tab" },
    { component: StudentDashboard, path: "/dashboard" },
];
const teacherRoutes = [
    { component: ClassroomList, path: "/classroom" },
    { component: ClassroomDetail, path: "/classroom/:id" },
    { component: Content, path: "/content" },
];
const guestRoutes = [{ component: Home, path: "/home" }];
const useRoutes = () => {
    const { user } = useApp();
    if (!user) {
        return guestRoutes;
    }
    const { role } = user;
    if (role === Role.Student) {
        return studentRoutes;
    }
    return role === Role.Adm ? adminRoutes : teacherRoutes;
};
export const Routes = () => {
    const app = useApp();
    const defaultRoute = app.user ? "/dashboard" : "/home";
    const routes = useRoutes();
    return (_jsx(_Fragment, { children: _jsxs(Switch, { children: [routes.map((item) => (_createElement(Route, Object.assign({}, item, { key: item.path, exact: true })))),
                _jsx(Route, { path: defaultRoute, component: DefaultComponent }, void 0),
                _jsx(Route, { path: "*", component: () => _jsx(Redirect, { to: defaultRoute }, void 0) }, void 0)] }, void 0) }, void 0));
};
