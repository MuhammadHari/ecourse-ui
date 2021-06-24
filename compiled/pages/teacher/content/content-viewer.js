import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { ContentProvider } from "@pages/shared/classroom/content/content-provider";
import { ContentView } from "@pages/shared/classroom/content/content";
import { useTeacherContent } from "@providers/teacher-content-provider";
export const ContentViewer = () => {
    const { selected } = useTeacherContent();
    if (!selected) {
        return _jsx(_Fragment, {}, void 0);
    }
    return (_jsx(_Fragment, { children: _jsx(ContentProvider, { children: _jsx(ContentView, {}, void 0) }, void 0) }, void 0));
};
