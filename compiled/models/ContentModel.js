import { ContentModelBase } from "./ContentModel.base";
import { modelMoment } from "@utils/model-moment";
/* A graphql query fragment builders for ContentModel */
export { selectFromContent, contentModelPrimitives, ContentModelSelector, } from "./ContentModel.base";
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
    get uploader() {
        if (!self.user) {
            return "";
        }
        return self.user.name;
    },
}))
    .views(modelMoment);
