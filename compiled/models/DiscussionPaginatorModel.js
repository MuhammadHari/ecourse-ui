import { DiscussionPaginatorModelBase } from "./DiscussionPaginatorModel.base";
/* A graphql query fragment builders for DiscussionPaginatorModel */
export { selectFromDiscussionPaginator, discussionPaginatorModelPrimitives, DiscussionPaginatorModelSelector } from "./DiscussionPaginatorModel.base";
/**
 * DiscussionPaginatorModel
 *
 * A paginated list of Discussion items.
 */
export const DiscussionPaginatorModel = DiscussionPaginatorModelBase
    .actions(self => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    }
}));
