import { ProgressModelBase } from "./ProgressModel.base";
import { ContentType } from "@models/ContentTypeEnum";
/* A graphql query fragment builders for ProgressModel */
export { selectFromProgress, progressModelPrimitives, ProgressModelSelector, } from "./ProgressModel.base";
/**
 * ProgressModel
 */
export const ProgressModel = ProgressModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    },
})).views((self) => ({
    get completion() {
        if (!self.played) {
            return 0;
        }
        const ty = self.contentType;
        const getV = (k) => {
            const v = !self[k] ? 0 : (self.played / self[k]);
            return isFinite(v) ? Math.floor(v * 100) : 0;
        };
        return getV(ty === ContentType.PDF ? "pageNumber" : "duration");
    },
}));
