import * as React from "react";
import { ContentProvider } from "@pages/shared/classroom/content/content-provider";
import { ContentView } from "@pages/shared/classroom/content/content";
import { useTeacherContent } from "@providers/teacher-content-provider";

export const ContentViewer = () => {
  const { selected } = useTeacherContent();
  if (!selected) {
    return <></>;
  }
  return (
    <>
      <ContentProvider>
        <ContentView />
      </ContentProvider>
    </>
  );
};
