import * as React from "react";
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
import { AdminTeacherAccount } from "@pages/shared/admin-teacher-account";

const DefaultComponent = () => {
  const app = useApp();
  const label = app.user ? app.user.role : "GUEST";
  const loc = useLocation();
  return (
    <div>
      <h1>Wait for implementation</h1>
      <p>{label}</p>
      <p>{loc.pathname}</p>
    </div>
  );
};

type AppRoute = {
  path: string;
  component: React.ComponentType<any>;
};

const adminRoutes = [
  { component: ClassroomList, path: "/classroom" },
  { component: ClassroomDetail, path: "/classroom/:id" },
  { component: AdminTeacher, path: "/teacher" },
  { component: AdminStudent, path: "/student" },
  { component: AdminTeacherAccount, path: "/account-setting" },
];
const studentRoutes = [
  { component: StudentContent, path: "/content/:sectionId/:contentId" },
  { component: StudentSection, path: "/section/:id" },
  { component: StudentDashboard, path: "/dashboard/:tab" },
  { component: StudentDashboard, path: "/dashboard" },
];
const teacherRoutes = [
  { component: ClassroomList, path: "/classroom" },
  { component: ClassroomDetail, path: "/classroom/:id" },
  { component: Content, path: "/content" },
  { component: AdminTeacherAccount, path: "/account-setting" },
];
const guestRoutes = [{ component: Home, path: "/home" }];

const useRoutes = (): AppRoute[] => {
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

  const defaultRoute = app.user ? "/classroom" : "/home";
  const routes = useRoutes();
  return (
    <>
      <Switch>
        {routes.map((item) => (
          <Route {...item} key={item.path} exact />
        ))}
        <Route path={defaultRoute} component={DefaultComponent} />
        <Route path="*" component={() => <Redirect to={defaultRoute} />} />
      </Switch>
    </>
  );
};
