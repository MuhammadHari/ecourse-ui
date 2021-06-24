import * as React from "react";
import { ContentModelSelector, ContentModelType } from "@root/models";
import { pageListFactory } from "@utils/page-list-provider";
import { RootStoreBaseQueries } from "@root-model";

const utils = pageListFactory<ContentModelType>({
  queryKey: RootStoreBaseQueries.queryContentByUser,
  modelBuilder(selector: ContentModelSelector) {
    return selector.id.title.thumbnail.title.type.pageNumber.mediaContent.duration.description.section(
      (i) => i.id.title
    );
  },
});
export const useTeacherContent = utils.useProvider;
export const TeacherContentProvider = utils.Provider;
