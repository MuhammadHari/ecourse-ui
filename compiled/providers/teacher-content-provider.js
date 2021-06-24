import { pageListFactory } from "@utils/page-list-provider";
import { RootStoreBaseQueries } from "@root-model";
const utils = pageListFactory({
    queryKey: RootStoreBaseQueries.queryContentByUser,
    modelBuilder(selector) {
        return selector.id.title.thumbnail.title.type.pageNumber.mediaContent.duration.description.section((i) => i.id.title);
    },
});
export const useTeacherContent = utils.useProvider;
export const TeacherContentProvider = utils.Provider;
