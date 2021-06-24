import { Instance } from "mobx-state-tree";
import { DiscussionModelBase } from "./DiscussionModel.base";
import { modelMoment } from "@utils/model-moment";

/* The TypeScript type of an instance of DiscussionModel */
export interface DiscussionModelType
  extends Instance<typeof DiscussionModel.Type> {}

/* A graphql query fragment builders for DiscussionModel */
export {
  selectFromDiscussion,
  discussionModelPrimitives,
  DiscussionModelSelector,
} from "./DiscussionModel.base";

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
      self.replyCount = (self.replyCount as number) + 1;
    },
  }))
  .views(modelMoment);
