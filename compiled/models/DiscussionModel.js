import { DiscussionModelBase } from "./DiscussionModel.base";
import { modelMoment } from "@utils/model-moment";
/* A graphql query fragment builders for DiscussionModel */
export { selectFromDiscussion, discussionModelPrimitives, DiscussionModelSelector, } from "./DiscussionModel.base";
/**
 * DiscussionModel
 */
export const DiscussionModel = DiscussionModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    },
}))
    .actions((self) => ({
    localeUpdateCount() {
        self.replyCount = self.replyCount + 1;
    },
}))
    .views(modelMoment);
