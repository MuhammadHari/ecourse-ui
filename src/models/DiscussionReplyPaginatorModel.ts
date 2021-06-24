import { Instance } from "mobx-state-tree"
import { DiscussionReplyPaginatorModelBase } from "./DiscussionReplyPaginatorModel.base"

/* The TypeScript type of an instance of DiscussionReplyPaginatorModel */
export interface DiscussionReplyPaginatorModelType extends Instance<typeof DiscussionReplyPaginatorModel.Type> {}

/* A graphql query fragment builders for DiscussionReplyPaginatorModel */
export { selectFromDiscussionReplyPaginator, discussionReplyPaginatorModelPrimitives, DiscussionReplyPaginatorModelSelector } from "./DiscussionReplyPaginatorModel.base"

/**
 * DiscussionReplyPaginatorModel
 *
 * A paginated list of DiscussionReply items.
 */
export const DiscussionReplyPaginatorModel = DiscussionReplyPaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
