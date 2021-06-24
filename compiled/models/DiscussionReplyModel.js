import { DiscussionReplyModelBase } from "./DiscussionReplyModel.base";
import { modelMoment } from "@utils/model-moment";
/* A graphql query fragment builders for DiscussionReplyModel */
export { selectFromDiscussionReply, discussionReplyModelPrimitives, DiscussionReplyModelSelector, } from "./DiscussionReplyModel.base";
/**
 * DiscussionReplyModel
 */
export const DiscussionReplyModel = DiscussionReplyModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    },
})).views(modelMoment);
