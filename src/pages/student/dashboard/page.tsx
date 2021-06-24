import * as React from "react";
import { StudentPageLayout } from "@root/layout/user/student-page-layout";
import { observer } from "mobx-react";
import { Controller } from "./controller";
import { Redirect, useParams } from "react-router-dom";
import { SectionList } from "./section-list";
import { Account } from "./account";
import { Progress } from "./progress";

const cMap = {
  courses: SectionList,
  account: Account,
  progress: Progress,
};

const Content = observer(() => {
  const { tab } = useParams<any>();
  const Component = cMap[tab as keyof typeof cMap] ?? React.Fragment;
  return <Component />;
});

export const Page = () => {
  const { tab } = useParams<any>();
  if (!tab) {
    return <Redirect to="/dashboard/courses" />;
  }
  return <StudentPageLayout navigator={<Controller />} content={<Content />} />;
};
