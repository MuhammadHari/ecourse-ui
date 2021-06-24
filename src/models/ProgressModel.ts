import {Instance} from "mobx-state-tree";
import {ProgressModelBase} from "./ProgressModel.base";
import {ContentType} from "@models/ContentTypeEnum";

/* The TypeScript type of an instance of ProgressModel */
export interface ProgressModelType
  extends Instance<typeof ProgressModel.Type> {}

/* A graphql query fragment builders for ProgressModel */
export {
  selectFromProgress,
  progressModelPrimitives,
  ProgressModelSelector,
} from "./ProgressModel.base";

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
    if (! self.played){
      return 0;
    }
    const ty = self.contentType as ContentType;
    const getV = (k : "pageNumber" | "duration") => {
      const v = ! self[k] ? 0 : ( self.played as number / (self[k] as number));
      return isFinite(v) ? Math.floor(v * 100): 0;
    }
    return getV(ty === ContentType.PDF ? "pageNumber" : "duration")
  },
}));
