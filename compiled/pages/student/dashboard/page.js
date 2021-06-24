import { jsx as _jsx } from "react/jsx-runtime";
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
    const { tab } = useParams();
    const Component = cMap[tab] ?? React.Fragment;
    return _jsx(Component, {}, void 0);
});
export const Page = () => {
    const { tab } = useParams();
    if (!tab) {
        return _jsx(Redirect, { to: "/dashboard/courses" }, void 0);
    }
    return _jsx(StudentPageLayout, { navigator: _jsx(Controller, {}, void 0), content: _jsx(Content, {}, void 0) }, void 0);
};
