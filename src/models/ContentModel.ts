import { Instance } from "mobx-state-tree";
import { ContentModelBase } from "./ContentModel.base";
import { modelMoment } from "@utils/model-moment";

/* The TypeScript type of an instance of ContentModel */
export interface ContentModelType extends Instance<typeof ContentModel.Type> {}

/* A graphql query fragment builders for ContentModel */
export {
  selectFromContent,
  contentModelPrimitives,
  ContentModelSelector,
} from "./ContentModel.base";

/**
 * ContentModel
 */
export const ContentModel = ContentModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}))
  .views((self) => ({
    get uploader(): string {
      if (!self.user) {
        return "";
      }
      return self.user.name as string;
    },
  }))
  .views(modelMoment);
